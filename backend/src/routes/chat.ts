import express from "express";
import {
  deleteChat,
  deleteMessage,
  editMessage,
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

router.patch("/edit-message", editMessage);

router.put("/reply-to-message", async (req, res) => {
  try {
    const { message, messageToReplyId, chatId, senderId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }
    const messageToReply = chat.messages.find(
      (msg) => msg._id.toString() === messageToReplyId
    );
    if (!messageToReply) {
      return res.status(404).json("Message to reply wasn't found");
    }
    const recipient = await User.findById(messageToReply.sender);
    if (!recipient) {
      return res.status(404).json("Recipient wasn't found");
    }
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json("Sender wasn't found");
    }
    const reply: IMessage = {
      message,
      sender: senderId,
      timeStamp: new Date(),
      reply: {
        isReply: true,
        messageToReplyId,
        messageToReplyMessage: messageToReply.message,
        messageToReplyRecipientName: recipient.fullName,
      },
    };
    chat.messages.push(reply);
    await chat.save();
    const myReply = chat.messages.at(-1);
    res.status(200).json(myReply);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
});
export default router;
