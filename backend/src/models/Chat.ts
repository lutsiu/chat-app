import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  messages: [{
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: String,
    images: [{type: String}],
    videos: [{type: String}],
    timeStamp: {type: Date, default: Date.now()}
  }]
});

const Chat = mongoose.model('Chat', chatSchema);


export default Chat;