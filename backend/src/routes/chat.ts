import express from 'express'
import User from '../models/User.ts';
import Chat from '../models/Chat.ts';
const router = express.Router();

router.post('/messages', async (req, res) => {
  try {
    const {message, userId} = req.body;
    
    res.status(204).send();
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
});

export default router;