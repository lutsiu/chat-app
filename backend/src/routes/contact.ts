import express from "express";
import User from "../models/User.ts";

const router = express.Router();

router.put("/add-contact", async (req, res) => {
  try {
    const { name, email, userId } = req.body as {
      name: string;
      email: string;
      userId: string;
    };
    const myUser = await User.findById(userId);
    if (myUser.contacts.find((contact) => contact.email === email)) {
      return res.status(409).json("Contact is already exists");
    }
    if (!myUser) {
      return res.status(404).json("User wasn't found");
    }

    const userToBeContact = await User.findOne({ email });
    if (!userToBeContact) {
      return res.status(404).json("There is no user with this email");
    }
    const contactToAdd = { _id: userToBeContact._id + "", name, email };
    myUser.contacts.push(contactToAdd);
    await myUser.save();
    return res.status(200).json(userToBeContact._id);
  } catch (err) {
    res.status(409).json("Internal error occured");
  }
});
router.put("/change-contact-name", async (req, res) => {
  try {
    const { userId, contactId, contactName } = req.body as {
      userId: string;
      contactId: string;
      contactName: string;
    };

    const myUser = await User.findById(userId);
    if (!myUser) {
      return res.status(404).json("User wasn't found");
    }

    myUser.contacts.map((contact) => {
      const matchingContact =
        contact._id.toString() === contactId.toString();

      if (!matchingContact) {
        return contact
      } else {
        contact.name = contactName
        return contact
      }
    });
    await myUser.save();
    return res.status(200).json('done')
  } catch (err) {

    return res.status(409).json("Internal error occured");
  }
});
export default router;
