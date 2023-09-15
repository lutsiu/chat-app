export interface UserModel {
  _id: string,
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
  sender: string;
  message: string;
  images?: string[];
  videos?: string[];
  file?: string;
  timeStamp: Date;
}