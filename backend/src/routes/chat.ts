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

router.get("/find-message-by-date", findMessageByDate);

router.get("/download-file");

router.get("/get-chats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User wasn't found");
    }
    const chatsPromises = user.chats.map((chat) => {
      return Chat.findById(chat).select([]);
    });
    const chats = await Promise.all(chatsPromises);
 
    const dataToReturnPromise = chats.map(async (chat) => {
      const interlocutor = chat.participants.find(
        (part) => part.toString() !== userId.toString()
      );  
      const isContact = user.contacts.find((cont) => cont._id.toString() === interlocutor.toString());
      const interlocutorInfo = await User.findById(interlocutor);
      let interlocutorName = interlocutorInfo.fullName;
      if (isContact) {
        interlocutorName = isContact.name
      }
      const data = {
        message: chat.messages.at(-1),
        interlocutor: {
          profilePicture: interlocutorInfo.profilePictures.at(-1),
          name: interlocutorName,
          userName: interlocutorInfo.userName
        },
      };  
      return data
    });
    const dataToReturn = await Promise.all(dataToReturnPromise);
    res.status(200).json(dataToReturn);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
});
export default router;
