import styles from "../styles.module.scss";
import ContactsSearchBar from "../../SearchBars/ContactsSearchBar";
import ContactListItem from "../ContactListItem";
import useResponsive from "../../../../hooks/useResponsive";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { useEffect, useState } from "react";
import { useSocket } from "../../../../context/SocketContext";
export interface ContactSocketData {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  status: string;
  userName: string;
}
export default function Contacts() {
  const [contacts, setContacts] = useState<ContactSocketData[]>([]);
  const [searchedContacts, setSearchedContacts] = useState<ContactSocketData[]>(
    []
  );
  const { user } = useSelector((state: ReduxState) => state.user);
  const { contactQuery} = useSelector((state: ReduxState) => state.createContact);
  const socket = useSocket();
  const width = useResponsive();

  useEffect(() => {
    socket.emit("get-contacts-info", {
      userId: user?._id,
      contacts: user?.contacts,
    });
  }, [socket, user?._id, user?.contacts]);

  useEffect(() => {
    socket.on("get-contacts-info", (data: ContactSocketData[]) => {
      if (data) {
        setContacts(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (contacts && contactQuery) {
      const matchingContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(contactQuery.toLowerCase());
      });
      setSearchedContacts(matchingContacts);
    }
    if (contactQuery === '') {
      setSearchedContacts([])
    }
  }, [contactQuery, contacts]);
  return (
    <div>
      {width >= 768 && (
        <ContactsSearchBar
        />
      )}
      <ul className={`${styles.contactsList} `}>
        {searchedContacts.length === 0 &&
          contacts.map((contact, i) => {
            return <ContactListItem key={i} contact={contact} />;
          })}
        {searchedContacts.length !== 0 &&
          searchedContacts.map((contact, i) => {
            return <ContactListItem key={i} contact={contact} />;
          })}
      </ul>
    </div>
  );
}
