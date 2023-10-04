import mongoose from "mongoose";
import { UserModel } from "../interfaces/models.ts";

const userSchema = new mongoose.Schema<UserModel>({
  fullName: {
    type: String,
    required: false, 
    default: ''
  },
  userName: {
    type: String, 
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictures: {
    type: [String],
    default: []
  },
  bio: {
    type: String,
    required: false,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  contacts: {
    type: [{name: String, _id: String, email: String}],
    default: []
  },
  chats: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chat', default: []}],
  confirmationCode: Number, 
  userIsVerified: {
    type: Boolean,
    default: false
  }
}); 

const User = mongoose.model('User', userSchema);

export default User;