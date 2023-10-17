import  { Request, Response } from "express";
import User from "../models/User.ts";
import {  validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import generatedNumber from "../utils/generateNumber.ts";
import { sendMail } from "../utils/nodemailer.ts";
import jwt from 'jsonwebtoken';


export const checkEmail = async (req, res) => {
  try {
    const { query } = req.body;
    const isUserExist = await User.findOne({ email: query });
    if (isUserExist) {
      res.status(200).json("User is already exist");
    } else {
      res.status(404).json("User doesn't exist. You can use this email");
    }
  } catch (err) {
    res.status(409).json("Internal server error occured");
  }
};
export const checkUsername = async (req, res) => {
  try {
    const { query } = req.body;
    const isUserExist = await User.findOne({ userName: query });
    if (isUserExist) {
      res.status(200).json("User is already exist");
    } else {
      res.status(404).json("User doesn't exist. You can use this email");
    }
  } catch (err) {
    res.status(409).json("Internal server error occured");
  }
};
export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({error: 'email', message: "There isn't user with this email address"});
    }
    const passwordsAreMatching = await bcrypt.compare(password, user.password);
    if (!passwordsAreMatching) {
      return res.status(404).json({error: 'password', message: 'Password is wrong. Try another one'});
    }
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.status(200).json({user, token});
  } catch(err) {  
    res.status(409).json('Internal error occured');
  }
};

export const signUpStep1 = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const validatorErrors = validationResult(req);

    if (!validatorErrors.isEmpty()) {
      return res.status(400).json({ errors: validatorErrors.array() });
    }
    const emailIsAlreadyExist = await User.findOne({ email });
    if (emailIsAlreadyExist) {
      return res.status(409).json("User is already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const confirmationCode = generatedNumber();
    sendMail(email, confirmationCode);
    const user = new User({
      email,
      password: encryptedPassword,
      confirmationCode,
    });
    await user.save();
    res.status(201).json(user._id);
  } catch (err) {
    res.status(409).json("Internal server error occured");
  }
};

export const signUpStep2 = async (req: Request, res: Response) => {
  try {
    const { code, userId } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json("Code is not 6 characters long");
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User for this code wasn't found");
    }
    const codesAreMathching = +user.confirmationCode === +code;
    if (!codesAreMathching) {
      return res.status(400).json("This code is incorrect. Try another one");
    }
    user.confirmationCode = null;
    user.userIsVerified = true;
    await user.save();
    res.status(200).json("Proceed");
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const signUpStep3 = async (req: Request, res: Response) => {
  try {
    const { userName, fullName, bio, userId } = req.body;
    const { path } = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User wasn't found");
    }
    user.fullName = fullName;
    user.userName = userName;
    user.bio = bio;
    user.profilePictures.push( path);
    user.status = {isActive: false, lastTimeSeen: new Date()};
    user.chats = [];
    await user.save();
    return res.status(201).json("Sign up is done");
  } catch (err) {
    res.status(409).json(err.message);
  }
}

export const resendCode = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(`User wasn't found`);
    }
    const newCode = generatedNumber();
    user.confirmationCode = newCode;
    await user.save();
    sendMail(user.email, newCode);
    res.status(200).json("Proceed");
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.query;

    await User.findByIdAndDelete(userId);
    res.status(204);
  } catch (err) {
    res.status(409).json(err);
  }
};
