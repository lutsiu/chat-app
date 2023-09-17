import express from "express";
import {
  deleteChat,
  findOrCreateChat,
  updateChat,
} from "../controllers/chat.ts";
import User from "../models/User.ts";
import Chat from "../models/Chat.ts";
import { IMessage } from "../interfaces/models.ts";

const router = express.Router();

router.post("/findOrCreateChat", findOrCreateChat);

router.delete("chat/:chatId", deleteChat);

router.put("/chat/:chatId", updateChat);

router.delete("/delete-message", async (req, res) => {
  try {
    const { messageId, chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }
    const message = await Chat.findOne({ "messages._id": messageId });
    if (!message) {
      return res.status(404).json("Message wasn't found");
    }
    chat.messages = chat.messages.filter((msg) => msg._id.toString() !== messageId);
    await chat.save();
    console.log(chat.messages);
    return res.status(200).json("Message was deleted");
  } catch (err) {
    res.status(409).json("Some internal error occured");
  }
});
export default router;
