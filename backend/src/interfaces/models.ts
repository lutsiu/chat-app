import mongoose from "mongoose";

export interface UserModel {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  status: string,
  contacts: string[];
  chats: string[];
  confirmationCode: number | null;
  userIsVerified: boolean;
}
export interface IMessage {
  _id?: string,
  sender: string;
  message: string;
  timeStamp: Date;
  images?: string[];
  videos?: string[];
  file?: string[];
  pinned?: boolean,
  reply: {
    isReply: boolean,
    messageToReplyId: string
  }
}