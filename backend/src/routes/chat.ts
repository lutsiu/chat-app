import express from "express";
import {
  deleteChat,
  deleteMessage,
  editMessage,
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

router.get("/find-message", async (req, res) => {
  try {
    const { chatId, message } = req.query as {
      chatId: string;
      message: string;
    };
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(409).json("Chat wasn't found");
    }

    const matches = chat.messages.filter((msg) => {
      return msg.message.toLowerCase().includes(message.toLowerCase());
    });

    const usersPromise = matches.map((msg) => {
      return User.findById(msg.sender);
    });
    const users = await Promise.all(usersPromise);
    const result = matches.map((msg) => {
      const user = users.find(
        (user) => user._id.toString() === msg.sender.toString()
      );
      const { _id, profilePicture, fullName } = user;
      return { message: msg, user: { _id, profilePicture, fullName } };
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
});
export default router;
