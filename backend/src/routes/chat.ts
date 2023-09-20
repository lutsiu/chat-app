import express from "express";
import {
  deleteChat,
  deleteMessage,
  editMessage,
  findMessage,
  findMessageByDate,
  findOrCreateChat,
  pinOrUnpin,
  replyToMessage,
  sendMessage,
} from "../controllers/chat.ts";
import User from "../models/User.ts";
import Chat from "../models/Chat.ts";
import { IMessage } from "../interfaces/models.ts";

const router = express.Router();

router.post("/findOrCreateChat", findOrCreateChat);

router.delete("chat/:chatId", deleteChat);

router.put("/chat/:chatId", sendMessage);

router.delete("/delete-message", deleteMessage);

router.patch("/edit-message", editMessage);

router.put("/reply-to-message", replyToMessage);

router.patch("/pin-or-unpin-message", pinOrUnpin);

router.get("/find-message", findMessage);

router.get('/find-message-by-date', findMessageByDate);


export default router;
