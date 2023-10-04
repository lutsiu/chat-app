import User from "../models/User.ts";

export const changeBio = async (req, res) => {
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
}

export const changeFullName = async (req, res) => {
  try {
    const {userId, fullName} = req.body 
  
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User wasn't found")
    }
    user.fullName = fullName;
    await user.save();
    return res.status(200).json(fullName);
  } catch (err) {
    res.status(409).json('Internal error occured');
  }
}

export const changeUserName = async (req, res) => {
  try {
    const {userId, userName} = req.body 
  
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("User wasn't found")
    }
    user.userName = userName;
    await user.save();
    return res.status(200).json(userName);
  } catch (err) {
    res.status(409).json('Internal error occured');
  }
}

export const checkUserNameUniqueness = async (req, res) => {
  try {
    const {userName} = req.query;
    const userNameIsUsed = await User.findOne({userName});
    if (!userNameIsUsed) {
      return res.status(404).json("not-used");
    } else {
      return res.status(200).json("is-used");
    }
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
}