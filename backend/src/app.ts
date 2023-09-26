import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import fs from "fs/promises";
import morgan from "morgan";
import * as socket from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.ts";
import chatRouter from "./routes/chat.ts";
import { body, validationResult } from "express-validator";
import generateNumber from "./utils/generateNumber.ts";
import User from "./models/User.ts";
import fetch from "node-fetch";
import { IFile, IMessage } from "./interfaces/models.ts";
import { signUpStep3 } from "./controllers/auth.ts";
import { FormData } from "formdata-polyfill/esm.min.js";
import { Blob } from "fetch-blob";
import { cwd } from "process";
import Chat from "./models/Chat.ts";
import { random } from "lodash";
/* CONFIG */

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/public", express.static(path.join(process.cwd(), "public")));
/* FILE STORAGE */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `public/uploads`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname.replace(".", `-${generateNumber()}.`));
  },
});

const upload = multer({ storage });

app.post("/auth/sign-up/step-3", upload.single("profilePicture"), signUpStep3);
app.put(
  "/chat/send-message-with-file",
  upload.single("file"),
  async (req, res) => {
    try {
      console.log(req.file, req.body);
    } catch (err) {
      res.status(409).json("Internal error occured");
    }
  }
);
/* ROUTES */
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
/* MONGO */

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(() => {
  const server = app.listen(PORT);
  const io = new socket.Server(server, {
    maxHttpBufferSize: 1e8,
    cors: {
      origin: "http://127.0.0.1:5173",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });
  io.on("connection", (socket) => {
    const { id } = socket;
    let roomId = null;
    socket.on("joinRoom", (chatId: string) => {
      roomId = chatId;
      socket.join(roomId);
      socket.emit("joinRoom", roomId);
    });
    socket.on(
      "send-message",
      async (message: {
        content: string;
        userId: string;
        chatId: string;
        senderId: string;
      }) => {
        try {
          const { content, userId, chatId, senderId } = message;
          socket.join(chatId);
          const body = JSON.stringify({
            message: content,
            senderId: userId,
            chatId,
          });
          const res = await fetch(`http://localhost:3000/chat/chat/${chatId}`, {
            method: "PUT",
            body,
            headers: { "Content-Type": "application/json" },
          });
          const result = (await res.json()) as IMessage;
          io.in(chatId).emit("send-message", result);
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "delete-message",
      async (data: { messageId: string; chatId: string }) => {
        try {
          const { messageId, chatId } = data;
          socket.join(chatId);
          const body = JSON.stringify({
            messageId,
            chatId,
          });
          const res = await fetch(`http://localhost:3000/chat/delete-message`, {
            method: "DELETE",
            body,
            headers: { "Content-Type": "application/json" },
          });
          if (res.ok) {
            io.in(chatId).emit("delete-message", messageId);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "edit-message",
      async (data: { messageId: string; chatId: string; message: string }) => {
        try {
          const { message, messageId, chatId } = data;
          socket.join(chatId);
          const body = JSON.stringify({
            message,
            messageId,
            chatId,
          });
          const res = await fetch("http://localhost:3000/chat/edit-message", {
            headers: { "Content-Type": "application/json" },
            body,
            method: "PATCH",
          });
          if (res.ok) {
            io.in(chatId).emit("edit-message", { messageId, message });
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "reply-to-message",
      async (data: {
        message: string;
        messageToReplyId: string;
        chatId: string;
        senderId: string;
      }) => {
        try {
          socket.join(data.chatId);
          const body = JSON.stringify(data);
          const res = await fetch(
            "http://localhost:3000/chat/reply-to-message",
            {
              headers: { "Content-Type": "application/json" },
              body,
              method: "PUT",
            }
          );
          if (res.ok) {
            const reply = await res.json();
            io.in(data.chatId).emit("reply-to-message", reply);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "pin-or-unpin-message",
      async (data: { messageId: string; chatId: string }) => {
        try {
          const { messageId, chatId } = data;
          socket.join(data.chatId);
          const body = JSON.stringify(data);
          const res = await fetch(
            "http://localhost:3000/chat/pin-or-unpin-message",
            {
              headers: { "Content-Type": "application/json" },
              body,
              method: "PATCH",
            }
          );
          if (res.ok) {
            io.in(chatId).emit("pin-or-unpin-message", messageId);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "find-message",
      async (data: { chatId: string; message: string }) => {
        try {
          const { chatId, message } = data;
          const res = await fetch(
            `http://localhost:3000/chat/find-message?chatId=${chatId}&message=${message}`
          );
          if (res.ok) {
            const data = await res.json();
            socket.emit("find-message", data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "find-message-by-date",
      async (data: { chatId: string; date: string }) => {
        try {
          const { chatId, date } = data;
          const time = new Date(date).getTime();
          const res = await fetch(
            `http://localhost:3000/chat/find-message-by-date?chatId=${chatId}&date=${time}`
          );
          if (res.ok) {
            const foundedMessage = await res.json();
            socket.emit("find-message-by-date", foundedMessage);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "send-message-with-file",
      async (data: {
        message: string;
        file: {
          file: Buffer;
          fileName: string;
          fileSize: number;
          type: string;
        };
        userId: string;
        chatId: string;
      }) => {
        try {
          const { message, file, userId, chatId } = data;
          socket.join(data.chatId);
          const chat = await Chat.findById(chatId);
          if (!chat) {
            console.log("chat wasnt found");
            return socket.emit("send-message-with-file", "Chat wasn't found");
          }
          const user = await User.findById(userId);
          if (!user) {
            console.log("user wasnt found");
            return socket.emit("send-message-with-file", "User wasn't found");
          }
          const baseDir = path.join(process.cwd(), "public", "uploads");
          const chatDir = path.join(baseDir, `chat-${chatId}`);
          const userDir = path.join(chatDir, `user-${userId}`);
          await fs.mkdir(chatDir, { recursive: true });
          await fs.mkdir(userDir, { recursive: true });
          const filePath = path.join(
            userDir,
            `${file.fileName.replace(".", `-${generateNumber()}.`)}`
          );
          const fileDirection = path.relative(process.cwd(), filePath);
          await fs.writeFile(filePath, file.file);
          const msgWithFile: IMessage = {
            message,
            sender: userId,
            timeStamp: new Date(),
            file: {
              filePath: fileDirection,
              fileName: file.fileName,
              fileType: file.type,
              fileSize: file.fileSize,
            },
          };
          chat.messages.push(msgWithFile);
          await chat.save();
          const messageToReturn = chat.messages.at(-1);
          io.in(chatId).emit("send-message-with-file", messageToReturn);
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "send-message-with-media",
      async (data: {
        message: string;
        userId: string;
        chatId: string;
        media: {
          media: Buffer;
          fileName: string;
          fileSize: number;
          fileType: string;
        }[];
      }) => {
        try {
          const { message, userId, chatId, media } = data;
          socket.join(data.chatId);
          const chat = await Chat.findById(chatId);
          if (!chat) {
            console.log("chat wasnt found");
            return socket.emit("send-message-with-file", "Chat wasn't found");
          }
          const user = await User.findById(userId);
          if (!user) {
            console.log("user wasnt found");
            return socket.emit("send-message-with-file", "User wasn't found");
          }
          const baseDir = path.join(process.cwd(), "public", "uploads");
          const chatDir = path.join(baseDir, `chat-${chatId}`);
          const userDir = path.join(chatDir, `user-${userId}`);

          await fs.mkdir(chatDir, { recursive: true });
          await fs.mkdir(userDir, { recursive: true });

          const mediaWithDirsPromise = media.map(async (md) => {
            const { fileName, fileSize, fileType } = md;
            const filePath = path.join(
              userDir,
              `${md.fileName.replace(".", `-${generateNumber()}.`)}`
            );
            const fileDirection = path.relative(process.cwd(), filePath);
            await fs.writeFile(filePath, md.media);
            const fileToReturn: IFile = {
              filePath: fileDirection,
              fileName,
              fileSize,
              fileType,
            };
            return fileToReturn;
          });
          const mediaWithDirs = await Promise.all(mediaWithDirsPromise);
          const msgWithMedia: IMessage = {
            message,
            sender: userId,
            timeStamp: new Date(),
            videos: mediaWithDirs.filter((md) => md.fileType.includes('video')),
            images: mediaWithDirs.filter(md => md.fileType.includes('image'))
          }
          chat.messages.push(msgWithMedia);
          await chat.save();
          const messageToReturn = chat.messages.at(-1);
          io.in(chatId).emit("send-message-with-media", messageToReturn);
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "download-file",
      async (data: { filePath: string; fileName: string }) => {
        const { fileName, filePath } = data;
        const res = await fetch(
          `http://localhost:3000/chat/download-file?filePath=${filePath}&fileName=${fileName}`
        );
        socket.emit("download-file", res);
      }
    );
    socket.on("disconnect", () => {
      console.log("USER IS DISCONNECTED");
    });
  });
});
