import ChatListItem from "../ChatListItem";
import styles from "./styles.module.scss";
import SearchList from "./SearchList";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../interfaces/redux";
import { useEffect, useState } from "react";
import {
  setSearchBarIsActive,
  setSearchBarValue,
} from "../../state/peopleSearch";
import { useSocket } from "../../context/SocketContext";
import { IMessage } from "../../interfaces/models";
import SkeletonElement from "../Widgets/Skeletons/SkeletonElement";
export interface ChatData {
  message: IMessage;
  interlocutor: {
    profilePicture: string;
    name: string;
    userName: string;
  };
}
export default function LeftSide() {
  const { searchBarIsActive } = useSelector(
    (state: ReduxState) => state.peopleSearch
  );
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [dataIsLoading] = useState(true);
  const { user } = useSelector((state: ReduxState) => state.user);
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    function resetRedux() {
      dispatch(setSearchBarIsActive(false));
      dispatch(setSearchBarValue(""));
    }
    window.addEventListener("beforeunload", resetRedux);
    return () => {
      window.removeEventListener("beforeunload", resetRedux);
    };
  }, [dispatch]);
  useEffect(() => {
    socket.emit("get-chats", user?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket.on("get-chats", (data: ChatData[]) => {
      if (data.length > 0) {
        setChatData(data);
      }
    });
  }, [socket]);
  return (
    <div className="w-full h-full flex flex-col max-h-[100vh] overflow-hidden">
      <Header />
      {!searchBarIsActive && (
        <ul
          className={`${styles.chatsList} bg-slate-800 h-full  flex flex-col overflow-y-scroll `}
        >
          {chatData.map((chat, i) => {
            return <ChatListItem key={i} chatData={chat} />;
          })}
          {chatData.length === 0 && dataIsLoading && (
            <SkeletonElement count={12} className="h-[5.8rem] rounded-xl"/>
          )}
        </ul>
      )}
      {searchBarIsActive && <SearchList chatData={chatData} chatDataIsLoading={dataIsLoading} />}
    </div>
  );
}
