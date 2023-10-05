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
import settingsRouter from "./routes/settings.ts";
import contactRouter from "./routes/contact.ts";
import { body, validationResult } from "express-validator";
import generateNumber from "./utils/generateNumber.ts";
import User from "./models/User.ts";
import fetch from "node-fetch";
import { Contact, IFile, IMessage } from "./interfaces/models.ts";
import { signUpStep3 } from "./controllers/auth.ts";
import { FormData } from "formdata-polyfill/esm.min.js";
import { Blob } from "fetch-blob";
import { cwd } from "process";
import Chat from "./models/Chat.ts";
import { random } from "lodash";
import {
  createBaseDir,
  createChatDir,
  createFileDir,
  createFilePathForDB,
  createUserDir,
  deleteFileFromDevice,
} from "./utils/manageDirs.ts";
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
    } catch (err) {
      res.status(409).json("Internal error occured");
    }
  }
);
/* ROUTES */
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/settings", settingsRouter);
app.use("/contact", contactRouter);
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
        mediaPath: string;
        mediaType: null | "video" | "image";
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
          const baseDir = createBaseDir();
          const chatDir = await createChatDir(chatId, baseDir);
          const userDir = await createUserDir(userId, chatDir);
          const fileDir = await createFileDir(
            userDir,
            file.fileName,
            file.file
          );
          const filePath = createFilePathForDB(fileDir);
          const msgWithFile: IMessage = {
            message,
            sender: userId,
            timeStamp: new Date(),
            file: {
              filePath: filePath,
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
          const baseDir = createBaseDir();
          const chatDir = await createChatDir(chatId, baseDir);
          const userDir = await createUserDir(userId, chatDir);

          const mediaWithDirsPromise = media.map(async (md) => {
            const { fileName, fileSize, fileType, media } = md;
            const fileDir = await createFileDir(userDir, fileName, media);
            const filePath = createFilePathForDB(fileDir);
            const fileToReturn: IFile = {
              filePath: filePath,
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
            media: mediaWithDirs,
          };
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
    socket.on(
      "delete-media",
      async (data: { messageId: string; chatId: string; filePath: string }) => {
        try {
          const { messageId, chatId, filePath } = data;
          socket.join(data.chatId);
          const chat = await Chat.findById(chatId);
          if (!chat) {
            console.log("chat wasnt found");
            return socket.emit("delete-media", "Chat wasn't found");
          }
          const message = chat.messages.find(
            (msg) => msg._id.toString() === messageId
          );
          if (!message) {
            return socket.emit("delete-media", "Message wasn't found");
          }
          const updatedMessageMedia = message.media.filter((md) => {
            if (md.filePath === filePath) {
              return false;
            } else {
              return true;
            }
          });
          message.media = updatedMessageMedia;
          chat.messages = chat.messages.map((msg) => {
            if (msg._id.toString() === message._id.toString()) {
              return message;
            } else {
              return msg;
            }
          });
          await chat.save();
          await deleteFileFromDevice(filePath);
          io.in(chatId).emit("delete-media", { messageId, message });
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on("change-bio", async (data: { userId: string; bio: string }) => {
      try {
        const body = JSON.stringify(data);
        const res = await fetch(`http://localhost:3000/settings/change-bio`, {
          headers: { "Content-Type": "application/json" },
          body,
          method: "PUT",
        });
        if (res.ok) {
          const bio = await res.json();
          socket.emit("change-bio", bio);
        }
      } catch (err) {
        console.log(err);
      }
    });
    socket.on(
      "change-full-name",
      async (data: { userId: string; bio: string }) => {
        try {
          const body = JSON.stringify(data);
          console.log(body);
          const res = await fetch(
            `http://localhost:3000/settings/change-full-name`,
            {
              headers: { "Content-Type": "application/json" },
              body,
              method: "PUT",
            }
          );
          if (res.ok) {
            const fullName = await res.json();
            socket.emit("change-full-name", fullName);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on("check-user-name-uniqueness", async (userName: string) => {
      try {
        const res = await fetch(
          `http://localhost:3000/settings/check-user-name-uniqueness?userName=${userName}`
        );
        const status = res.status;
        socket.emit("check-user-name-uniqueness", { userName, status });
      } catch (err) {
        console.log(err);
      }
    });
    socket.on(
      "change-user-name",
      async (data: { userId: string; bio: string }) => {
        try {
          const body = JSON.stringify(data);
          const res = await fetch(
            `http://localhost:3000/settings/change-user-name`,
            {
              headers: { "Content-Type": "application/json" },
              body,
              method: "PUT",
            }
          );
          if (res.ok) {
            const bio = await res.json();
            socket.emit("change-user-name", bio);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "change-profile-picture",
      async (data: {
        userId: string;
        picture: {
          file: Buffer;
          fileName: string;
        };
      }) => {
        const { userId, picture } = data;
        const user = await User.findById(userId);
        if (!user) {
          console.log("user wasnt found");
          return socket.emit("change-profile-picture", "User wasn't found");
        }
        const baseDir = createBaseDir();
        const userDir = await createUserDir(userId, baseDir);
        const fileDir = await createFileDir(
          userDir,
          picture.fileName,
          picture.file
        );
        const filePath = createFilePathForDB(fileDir);
        user.profilePictures.push(filePath);
        await user.save();
        socket.emit("change-profile-picture", filePath);
        try {
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "add-contact",
      async (data: { name: string; email: string; userId: string }) => {
        try {
          const { name, email } = data;
          const body = JSON.stringify(data);
          const res = await fetch(`http://localhost:3000/contact/add-contact`, {
            headers: { "Content-Type": "application/json" },
            body,
            method: "PUT",
          });
          if (res.ok) {
            const _id = await res.json();
            socket.emit("add-contact", { _id, name, email });
            return { _id, name, email };
          } else {
            socket.emit("add-contact", null);
            return null;
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on(
      "get-contacts-info",
      async (data: { userId: string; contacts: Contact[] }) => {
        try {
          const { userId, contacts } = data;
          const user = await User.findById(userId);
          if (!user) {
            socket.emit("get-contacts-info", null);
          }
          const contactsInfoPromise = contacts.map((contact) => {
            return User.findById(contact._id);
          });
          const contactsInfo = await Promise.all(contactsInfoPromise);
          const contactsToReturn = contactsInfo.map((contact) => {
            const contactToReturn = contacts.find(
              (con) => con._id.toString() === contact._id.toString()
            );
            const { _id, name, email } = contactToReturn;
            return {
              _id,
              name,
              email,
              profilePicture: contact.profilePictures.at(-1),
              status: contact.status,
              userName: contact.userName,
            };
          });
          socket.emit("get-contacts-info", contactsToReturn);
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on('get-chats', async (userId: string) => {
      try {
        const res = await fetch(`http://localhost:3000/chat/get-chats/${userId}`)
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          socket.emit('get-chats', data)
        } else [
          socket.emit('get-chats', [])
        ]
      } catch (err) {
        console.log(err);
      }
    })
    socket.on("disconnect", () => {
      console.log("USER IS DISCONNECTED");
    });
  });
});
