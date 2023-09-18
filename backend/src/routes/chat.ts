import express from "express";
import {
  deleteChat,
  deleteMessage,
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

router.delete("/delete-message", deleteMessage);

router.patch('/edit-message', async (req, res) => {
  try {
    const {messageId, chatId, message} = req.body
    const chat = await Chat.findById(chatId); 
    if (!chat) {
      return res.status(409).json("Chat wasn't found");
    }
    const foundedMessage = await Chat.findOne({'messages._id': messageId});
    if (!foundedMessage) {
      return res.status(409).json("Message wasn't found");
    }
    const updatedMessages = chat.messages.map((msg) => {
      if (msg._id.toString() !== messageId) {
        return msg
      } else {
        msg.message = message;
        msg.isEdited = true;
        return msg
      }
    });
    chat.messages = updatedMessages;
    await chat.save();
    return res.status(200).json('Done');
  } catch (err) { 
    res.status(409).json('some internal error occured');
  }
});
export default router;
