export interface UserModel {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  profilePictures: string[];
  bio: string;
  status: IStatus;
  contacts: IContact[];
  chats: string[];
  confirmationCode: number | null;
  userIsVerified: boolean;
}

export interface IContact {
  name: string,
  _id: string, 
  email: string
}

export interface IFile {
  filePath: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}
export interface IReply {
  isReply: boolean;
  messageToReplyId: string;
  messageToReplyMessage: string;
  messageToReplyRecipientName: string;
  mediaPath: string,
  mediaType: MediaType
}
export interface IMessage {
  _id?: string;
  sender: string;
  message: string;
  timeStamp: Date;
  media: IFile[];
  file?: IFile;
  pinned?: boolean;
  reply?: IReply;
  isEdited?: boolean;
}

export type MediaType = null | 'video' | 'image'; 
export interface SearchedMessage {
  message: IMessage;
  user: { _id: string; fullName: string; profilePicture: string };
}

export interface IStatus {
  isActive: boolean, 
  lastTimeSeen: Date
}