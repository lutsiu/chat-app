import mongoose from "mongoose";
import { IMessage } from "../interfaces/models.ts";

interface IChat {
  participants: string[];
  messages: IMessage[];
}

const messageSchema = new mongoose.Schema<IMessage>({
  sender: String,
  message: String,
  images: { type: [String], required: false },
  videos: { type: [String], required: false },
  file: String,
  timeStamp: { type: Date, default: Date.now() },
  pinned: {
    type: Boolean,
    default: false,
    required: false,
  },
  reply: {
    isReply: {
      type: Boolean,
      default: false,
    },
    messageToReplyId: {
      type: String,
      default: null,
    },
  },
  isEdited: {
    type: Boolean,
    required: false,
  },
});

const chatSchema = new mongoose.Schema<IChat>({
  participants: [String],
  messages: [messageSchema],
});

const Chat = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
