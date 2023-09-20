import { Request, Response } from "express";
import User from "../models/User.ts";
import Chat from "../models/Chat.ts";
import { IMessage } from "../interfaces/models.ts";

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }
    await Chat.findByIdAndDelete(chatId);
    res.status(204).json("Chat was deleted successfully");
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const updateChat = async (req, res) => {
  try {
    const { message, senderId } = req.body;
    const { chatId } = req.params;
    const user = await User.findById(senderId);
    if (!user) {
      return res.status(404).json("User wasn't found");
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }

    const newMessage: IMessage = {
      sender: senderId,
      message: message as string,
      timeStamp: new Date(),
    };
    chat.messages.push(newMessage);
    await chat.save();
    const lastMsg = chat.messages.at(-1);
    res.status(200).json(lastMsg);
    // updating logic
  } catch (err) {
    console.log(err);
    res.status(409).json("Internal error occured");
  }
};

export const findOrCreateChat = async (req, res) => {
  try {
    const { myUserName, interlocutorUserName } = req.body;
    const myUser = await User.findOne({ userName: myUserName });
    const interlocutor = await User.findOne({ userName: interlocutorUserName });
    if (!myUser || !interlocutor) {
      return res.status(404).json("One of users wasn't found");
    }
    const participants = [myUser._id, interlocutor._id].sort();
    const chat = await Chat.findOne({
      participants,
    });
    if (chat) {
      return res
        .status(200)
        .json({ chatId: chat._id, chatHistory: chat.messages });
    }
    if (!chat) {
      const newChat = new Chat({
        participants: [myUser._id, interlocutor._id],
      });
      await newChat.save();

      return res
        .status(201)
        .json({ chatId: newChat._id, chatHistory: newChat.messages });
    }
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId, chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }
    const message = await Chat.findOne({ "messages._id": messageId });
    if (!message) {
      return res.status(404).json("Message wasn't found");
    }
    chat.messages = chat.messages.filter(
      (msg) => msg._id.toString() !== messageId
    );
    await chat.save();
    console.log(chat.messages);
    return res.status(200).json("Message was deleted");
  } catch (err) {
    res.status(409).json("Some internal error occured");
  }
};

export const editMessage = async (req, res) => {
  try {
    const { messageId, chatId, message } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(409).json("Chat wasn't found");
    }
    const foundedMessage = await Chat.findOne({ "messages._id": messageId });
    if (!foundedMessage) {
      return res.status(409).json("Message wasn't found");
    }
    const updatedMessages = chat.messages.map((msg) => {
      if (msg._id.toString() !== messageId) {
        return msg;
      } else {
        msg.message = message;
        msg.isEdited = true;
        return msg;
      }
    });
    chat.messages = updatedMessages;
    await chat.save();
    return res.status(200).json("Done");
  } catch (err) {
    res.status(409).json("some internal error occured");
  }
};

export const replyToMessage = async (req, res) => {
  try {
    const { message, messageToReplyId, chatId, senderId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }
    const messageToReply = chat.messages.find(
      (msg) => msg._id.toString() === messageToReplyId
    );
    if (!messageToReply) {
      return res.status(404).json("Message to reply wasn't found");
    }
    const recipient = await User.findById(messageToReply.sender);
    if (!recipient) {
      return res.status(404).json("Recipient wasn't found");
    }
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json("Sender wasn't found");
    }
    const reply: IMessage = {
      message,
      sender: senderId,
      timeStamp: new Date(),
      reply: {
        isReply: true,
        messageToReplyId,
        messageToReplyMessage: messageToReply.message,
        messageToReplyRecipientName: recipient.fullName,
      },
    };
    chat.messages.push(reply);
    await chat.save();
    const myReply = chat.messages.at(-1);
    res.status(200).json(myReply);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const pinOrUnpin = async (req, res) => {
  try {
    const {messageId, chatId} = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found")
    }
    const message = chat.messages.find((msg) => msg._id.toString() === messageId)
    if (!message) {
      return res.status(404).json("Message wasn't found")
    };
    chat.messages.map((msg) => {
      if (msg._id.toString() !== messageId) {
        return msg
      } else {
        msg.pinned = !msg.pinned
      }
    })
    await chat.save();
    return res.status(200).json('done')
  } catch (err) {
    res.status(409).json('Internal server error occured');
  }
}