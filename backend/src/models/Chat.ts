import mongoose from "mongoose";
import { IMessage } from "../interfaces/models.ts";

interface IChat {
  participants: string[];
  messages: IMessage[];
}

const messageSchema = new mongoose.Schema<IMessage>({
  sender: String,
  message: String,
  media: [{
    filePath: String,
    fileName: String,
    fileType: String,
    fileSize: Number
  }],
  file: {
    filePath: String,
    fileName: String,
    fileType: String,
    fileSize: Number
  },
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
    messageToReplyMessage: String,
    messageToReplyRecipientName: String,
    mediaPath: {
      required: false,
      type: String
    },
    mediaType: {
      required: false,
      type: String
    }
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
