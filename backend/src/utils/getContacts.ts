import User from "../models/User.ts";
const getContactInfo = async (userId, contacts, query = '') => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return [];
    }

    let filteredContacts = user.contacts;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredContacts = user.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(lowerQuery)
      );
    }

    const contactIds = filteredContacts.map((contact) => contact._id);
    const contactsInfo = await User.find({ _id: { $in: contactIds } });

    const contactsToReturn = contactsInfo.map((contact) => {
      const contactToReturn = filteredContacts.find(
        (con) => con._id.toString() === contact._id.toString()
      );

      const { _id, name, email } = contactToReturn;
      return {
        _id,
        name,
        email,
        profilePicture: contact.profilePictures.at(-1),
        status: contact.status,
        userName: contact.userName,
      };
    });

    return contactsToReturn;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export default getContactInfo