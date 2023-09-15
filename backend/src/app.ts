import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
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
import { IMessage } from "./interfaces/models.ts";
/* CONFIG */

dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

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

app.post(
  "/auth/sign-up/step-3",
  upload.single("profilePicture"),
  async (req: Request, res: Response) => {
    try {
      const { userName, fullName, bio, userId } = req.body;
      const { path } = req.file;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json("User wasn't found");
      }
      user.fullName = fullName;
      user.userName = userName;
      user.bio = bio;
      user.profilePicture = path;
      await user.save();
      return res.status(201).json("Sign up is done");
    } catch (err) {
      res.status(409).json(err.message);
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
      "chatMessage",
      async (message: { content: string; userId: string; chatId: string }) => {
        try {
          const { content, userId, chatId } = message;
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
          console.log(socket.rooms);
          io.in(chatId).emit('chatMessage', result);
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on("disconnect", () => {
      console.log("USER IS DISCONNECTED");
    });
  });
});
