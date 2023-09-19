import express from "express";
import {
  deleteChat,
  deleteMessage,
  editMessage,
  findOrCreateChat,
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

router.patch('/pin-or-unpin-message', async (req, res) => {
  try {
    const {messageId, chatId} = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found")
    }
    const message = chat.messages.find((msg) => msg._id.toString() === messageId)
    if (!message) {
      return res.status(404).json("Message wasn't found")
    };
    chat.messages.map((msg) => {
      if (msg._id.toString() !== messageId) {
        return msg
      } else {
        msg.pinned = !msg.pinned
      }
    })
    await chat.save();
    return res.status(200).json('done')
  } catch (err) {
    res.status(409).json('Internal server error occured');
  }
})
export default router;
