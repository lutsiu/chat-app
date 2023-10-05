import { Request, Response } from "express";
import User from "../models/User.ts";
import Chat from "../models/Chat.ts";
import { IMessage } from "../interfaces/models.ts";
import { deleteFileFromDevice } from "../utils/manageDirs.ts";
import getMessageToReplyMessage from "../utils/getMessageToReplyMessage.ts";
import path from "path";
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

export const sendMessage = async (req, res) => {
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

    const interlocutor = await User.findOne({
      userName: interlocutorUserName,
    }).select(["-password", "-contacts", "-userIsVerified", "-chats", '-confirmationCode']);

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
        .json({ chatId: chat._id, chatHistory: chat.messages, interlocutor });
    }

    if (!chat) {
      const newChat = new Chat({
        participants: [myUser._id, interlocutor._id],
      });
      await newChat.save();
      myUser.chats.push(newChat.id);
      interlocutor.chats.push(newChat.id);
      await myUser.save();
      await interlocutor.save();
      return res.status(201).json({
        chatId: newChat._id,
        chatHistory: newChat.messages,
        interlocutor,
      });
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
    const message = chat.messages.find(
      (msg) => msg._id.toString() === messageId
    );
    if (!message) {
      return res.status(404).json("Message wasn't found");
    }
    if (message.file.filePath) {
      await deleteFileFromDevice(message.file.filePath);
    }
    if (message.media.length > 0) {
      message.media.forEach(async (md) => {
        await deleteFileFromDevice(md.filePath);
      });
    }
    chat.messages = chat.messages.filter(
      (msg) => msg._id.toString() !== messageId
    );
    await chat.save();
    return res.status(200).json("Message was deleted");
  } catch (err) {
    /*     console.log(err); */
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
    const { message, messageToReplyId, chatId, senderId, mediaType, mediaPath } = req.body;
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
    const messageToReplyMessage = getMessageToReplyMessage(messageToReply, mediaType);
    const reply: IMessage = {
      message,
      sender: senderId,
      timeStamp: new Date(),
      reply: {
        isReply: true,
        messageToReplyId,
        messageToReplyMessage: messageToReplyMessage,
        messageToReplyRecipientName: recipient.fullName,
        mediaPath: mediaPath ? mediaPath : "",
        mediaType: mediaType ? mediaType: ''
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
    const { messageId, chatId } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json("Chat wasn't found");
    }
    const message = chat.messages.find(
      (msg) => msg._id.toString() === messageId
    );
    if (!message) {
      return res.status(404).json("Message wasn't found");
    }
    chat.messages.map((msg) => {
      if (msg._id.toString() !== messageId) {
        return msg;
      } else {
        msg.pinned = !msg.pinned;
      }
    });
    await chat.save();
    return res.status(200).json("done");
  } catch (err) {
    res.status(409).json("Internal server error occured");
  }
};

export const findMessage = async (req, res) => {
  try {
    const { chatId, message } = req.query as {
      chatId: string;
      message: string;
    };
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(409).json("Chat wasn't found");
    }

    const matches = chat.messages.filter((msg) => {
      return msg.message.toLowerCase().includes(message.toLowerCase());
    });

    const usersPromise = matches.map((msg) => {
      return User.findById(msg.sender);
    });
    const users = await Promise.all(usersPromise);
    const result = matches.map((msg) => {
      const user = users.find(
        (user) => user._id.toString() === msg.sender.toString()
      );
      const { _id, profilePictures, fullName } = user;
      return { message: msg, user: { _id, profilePictures, fullName } };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const findMessageByDate = async (req, res) => {
  try {
    const { chatId, date } = req.query;
    console.log(chatId, date);
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).json("Chat wasn't found");
    }
    if (chat.messages.length === 0) {
      res.status(200).json(null);
    }
    const messagesAndTime = chat.messages.map((msg) => {
      const msgDate = new Date(msg.timeStamp).getTime();
      const timeDifference = Math.abs(+date - msgDate);
      return { msg, timeDifference };
    });
    const closestDate = messagesAndTime.reduce((prev, cur) => {
      return prev.timeDifference < cur.timeDifference ? prev : cur;
    });
    res.status(200).json(closestDate.msg);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const downloadFile = async (req, res) => {
  try {
    const {fileName, filePath} = req.query as {fileName: string, filePath: string};
    const fullFilePath = path.join(process.cwd(), filePath);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
    return res.sendFile(fullFilePath ,(err) => {
      if (err) {
        return res.status(404).json("error occurred"); 
      }
    })
  } catch (err) {
    console.log(err);
  }
}