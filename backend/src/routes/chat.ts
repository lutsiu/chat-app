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
import path from "path";
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

router.get('/download-file', async (req, res) => {
  try {
    const {fileName, filePath} = req.query as {fileName: string, filePath: string};
    const fullFilePath = path.join(process.cwd(), filePath);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
    return res.sendFile(fullFilePath ,(err) => {
      if (err) {
        return res.status(404).json("error occurred"); 
      }
    })
  } catch (err) {
    console.log(err);
  }
})
export default router;
