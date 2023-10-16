import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { mediumPurple, gray } from "../../../../../utils/colors";
import { IoMdClose } from "react-icons/io";
import { IMessage } from "../../../../../interfaces/models";
import { useSocket } from "../../../../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  handleScrollToMessage,
  setSearchedMessages,
} from "../../../../../state/message";
import { ReduxState } from "../../../../../interfaces/redux";
interface Props {
  query: string;
  setQuery: (query: string) => void;
  debouncedQuery: string;
  setDebouncedQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function ResponsiveSearch(props: Props) {
  const { query, setQuery, debouncedQuery, setDebouncedQuery } = props;
  const {chatId} = useSelector((state: ReduxState) => state.chat);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const { searchMessages } = useSelector((state: ReduxState) => state.message);
  const [timer, setTimer] = useState<any | null>(null);
  const socket = useSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    // Function to emit the query after a delay
    const emitQuery = () => {
      if (query.length > 0) {
        socket.emit("find-message", { chatId, message: debouncedQuery });
      }
    };

    if (query !== debouncedQuery) {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(emitQuery, 300);
      setTimer(newTimer);
    }

    setDebouncedQuery(query);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [query, debouncedQuery, socket, chatId, timer, setDebouncedQuery]);

  useEffect(() => {
    socket.on(
      "find-message",
      (
        data: {
          message: IMessage;
          user: { _id: string; profilePicture: string; fullName: string };
        }[]
      ) => {
        if (data) {
          dispatch(setSearchedMessages(data));
        }
      }
    );
  }, [socket, dispatch]);

  // scroll to first matching message
  useEffect(() => {
    if (searchMessages) {
      const lastSearchMsg = searchMessages.at(-1);
      const lastMsgDOM = document.getElementById(
        lastSearchMsg?.message._id as string
      ) as HTMLElement;
      const lastMsgParent = lastMsgDOM.parentElement as HTMLElement;
      dispatch(handleScrollToMessage({ top: lastMsgDOM?.offsetTop + lastMsgParent?.offsetTop }));
    }
  }, [searchMessages, dispatch]);
  return (
    <form
      className="rounded-3xl relative px-[1rem] flex w-full  items-center py-[0.8rem] bg-gray-900 border-[1px] duration-200"
      style={{ borderColor: inputIsFocused ? mediumPurple : gray }}
    >
      <HiMagnifyingGlass
        className="text-3xl mr-[1.3rem] duration-200 absolute left-[0.5rem] top-[0.9rem]"
        style={{ color: inputIsFocused ? mediumPurple : gray }}
      />
      <input
        type="text"
        name="chatQuery"
        className="w-full bg-transparent outline-none text-2xl font-medium px-[2.5rem]"
        placeholder="Search"
        onFocus={() => setInputIsFocused(true)}
        onBlur={() => setInputIsFocused(false)}
        onChange={(e) => setQuery(e.currentTarget.value)}
        value={query}
      />
      <IoMdClose
        className="text-4xl duration-200 absolute right-[0.5rem] top-[0.75rem] cursor-pointer"
        style={{
          color: inputIsFocused ? mediumPurple : gray,
          opacity: query ? 1 : 0,
          pointerEvents: query ? "all" : "none",
        }}
        onClick={() => {
          dispatch(setSearchedMessages(null));
          setQuery("");
        }}
      />
    </form>
  );
}
