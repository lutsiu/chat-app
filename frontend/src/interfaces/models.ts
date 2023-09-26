export interface UserModel {
  _id: string;
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
  fileSize: number;
  fileType: string;
}
export interface IMessage {
  _id?: string;
  sender: string;
  message: string;
  timeStamp: Date;
  media: IFile[];
  file?: IFile;
  pinned?: boolean;
  reply?: {
    isReply: boolean;
    messageToReplyId: string;
    messageToReplyMessage: string;
    messageToReplyRecipientName: string;
  };
  isEdited?: boolean;
}

export interface SearchedMessage {
  message: IMessage;
  user: { _id: string; fullName: string; profilePicture: string };
}
