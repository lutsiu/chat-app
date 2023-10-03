import express from 'express';
import User from '../models/User.ts';

const router = express.Router();

router.put('/change-bio', async (req, res) => {
  try {
    const {userId, bio} = req.body 
  
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User wasn't found")
    }
    user.bio = bio;
    await user.save();
    return res.status(200).json(bio);
  } catch (err) {
    res.status(409).json('Internal error occured');
  }
});

export default router