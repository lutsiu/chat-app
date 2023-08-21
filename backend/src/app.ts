import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from 'helmet';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.ts";
import { body, validationResult } from "express-validator";
import generateNumber from "./utils/generateNumber.ts";
import User from "./models/User.ts";

/* CONFIG */

dotenv.config();

const app = express();
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({extended: true, limit: '30mb'}));
app.use(cors({credentials: true}));
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common')); 


/* FILE STORAGE */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `public/uploads`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname.replace('.', `-${generateNumber()}.`));
  },
});

const upload = multer({storage});


app.post(
  "/auth/sign-up/step-3",
  upload.single('profilePicture'),
  async (req: Request, res: Response) => {
    try {
      const {userName, fullName, bio, userId} = req.body;
      const {path} = req.file;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json("User wasn't found");
      }
      user.fullName = fullName;
      user.userName = userName;
      user.bio = bio;
      user.profilePicture = path;
      await user.save();
      return res.status(201).json("Sign up is done"); 
    } catch (err) {
      res.status(409).json(err.message);
    }
  }
);

/* ROUTES */
app.use('/auth', authRouter)

/* MONGO */

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT);
});