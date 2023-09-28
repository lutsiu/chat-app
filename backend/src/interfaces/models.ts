import mongoose from "mongoose";

export interface UserModel {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  status: string;
  contacts: string[];
  chats: string[];
  confirmationCode: number | null;
  userIsVerified: boolean;
}
export interface IFile {
  filePath: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}
export interface IMessage {
  _id?: string;
  sender: string;
  message: string;
  timeStamp: Date;
  media?: IFile[],
  file?: IFile;
  pinned?: boolean;
  reply?: {
    isReply: boolean;
    messageToReplyId: string;
    messageToReplyMessage: string;
    messageToReplyRecipientName: string;
    mediaPath?: string,
    mediaType?: string
  };
  isEdited?: boolean;
}
