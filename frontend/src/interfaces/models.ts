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