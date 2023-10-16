import { useSelector } from "react-redux";
import SearchGroupPeople from "./SearchGroupPeople";
import { ReduxState } from "../../../interfaces/redux";
import FoundPeople from "./FoundPeople";
import FoundChats from "./FoundChats";
import { useState, useEffect } from "react";
import { ChatData } from "..";
import { useSocket } from "../../../context/SocketContext";

export interface Interlocutor {
  profilePicture: string;
  name: string;
  userName: string;
}

export interface FoundContact {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  status: string;
  userName: string;
}

interface Props {
  chatData: ChatData[];
  chatDataIsLoading: boolean;
}
export default function SearchList(props: Props) {
  const { chatData, chatDataIsLoading } = props;
  const { user } = useSelector((state: ReduxState) => state.user);
  const { searchBarValue } = useSelector(
    (state: ReduxState) => state.peopleSearch
  );
  const [contactsDataIsLoading, setContactsDataIsLoading] = useState(true);
  const socket = useSocket();
  const [searchedChats, setSearchedChats] = useState<Interlocutor[]>([]);
  const [searchedContacts, setSearchedContacts] = useState<FoundContact[]>([]);
  useEffect(() => {
    // set searched contacts
    if (user?.contacts && searchBarValue) {
      setContactsDataIsLoading(true);
      socket.emit("get-contacts-with-query", {
        userId: user._id,
        query: searchBarValue,
      });
    }
    // set searched chats
    if (searchBarValue) {
      const matchingChats = chatData.filter((chat) => {
        return chat.interlocutor.userName
          .toLowerCase()
          .includes(searchBarValue.toLowerCase()) || chat.interlocutor.name.toLowerCase()
          .includes(searchBarValue.toLowerCase());
      });
      if (matchingChats.length > 0) {
        const chats = matchingChats.map((chat) => chat.interlocutor);
        setSearchedChats(chats);
      } else {
        socket.emit('search-user', {query: searchBarValue, userId: user?._id});
      }
    }
    if (searchBarValue === "") {
      setContactsDataIsLoading(true);
      setSearchedContacts([]);
      setSearchedChats([]);
    }
  }, [searchBarValue, chatData, user?.contacts, user?._id, socket]);

  useEffect(() => {
    socket.on("get-contacts-with-query", (data: FoundContact[]) => {
      setSearchedContacts(data);
      setContactsDataIsLoading(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('search-user', (data: Interlocutor[]) => {
      if (data.length>  0) {
        setSearchedChats(data);
        console.log(data)
      }
    })
  }, [socket]);
  return (
    <div className="flex-1 max-w-full bg-slate-800 origin-bottom  ">
      {!searchBarValue && (
        <SearchGroupPeople
          interlocutors={chatData.map((data) => data.interlocutor)}
          dataIsLoading={chatDataIsLoading}
        />
      )}
      {searchBarValue && (
        <FoundPeople
          people={searchedContacts}
          dataIsLoading={contactsDataIsLoading}
        />
      )}

      {searchBarValue && <FoundChats chats={searchedChats} />}
    </div>
  );
}
