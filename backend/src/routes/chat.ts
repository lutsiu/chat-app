import express from "express";
import {
  deleteChat,
  deleteMessage,
  editMessage,
  findMessage,
  findOrCreateChat,
  pinOrUnpin,
  replyToMessage,
  updateChat,
} from "../controllers/chat.ts";
import User from "../models/User.ts";
import Chat from "../models/Chat.ts";
import { IMessage } from "../interfaces/models.ts";

const router = express.Router();

router.post("/findOrCreateChat", findOrCreateChat);

router.delete("chat/:chatId", deleteChat);

router.put("/chat/:chatId", updateChat);

router.delete("/delete-message", deleteMessage);

router.patch("/edit-message", editMessage);

router.put("/reply-to-message", replyToMessage);

router.patch("/pin-or-unpin-message", pinOrUnpin);

router.get("/find-message", findMessage);

router.get('/find-message-by-date', async (req, res) => {
  try {
    const {chatId, date} = req.query;
    console.log(chatId, date);
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).json("Chat wasn't found");
    }
    if (chat.messages.length === 0) {
      res.status(200).json(null);
    }
    const messagesAndTime = chat.messages.map((msg) => {
      const msgDate = new Date(msg.timeStamp).getTime();
      const timeDifference = Math.abs(+date - msgDate)
      return {msg, timeDifference}
    });
    const closestDate = messagesAndTime.reduce((prev, cur) => {
      return prev.timeDifference < cur.timeDifference ? prev : cur;
    });
    res.status(200).json(closestDate.msg);
  } catch(err) {
    res.status(409).json('Internal error occured');
  }
})
export default router;
