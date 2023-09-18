import { motion } from "framer-motion";
import { BsReply, BsFillPinAngleFill } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { RiUnpinFill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import useResponsive from "../../../../../hooks/useResponsive";
import { IMessage } from "../../../../../interfaces/models";
import { useSocket } from "../../../../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEditMessage,
  handleForwardMessage,
  handleReplytoMessage,
} from "../../../../../state/ui";
import { ReduxState } from "../../../../../interfaces/redux";

interface Props {
  x: number;
  y: number;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
  msg: IMessage;
  chatId: string;
  messageUpperPoint: number | undefined;
  myUserId: string
}

export default function MessageContextMenu(props: Props) {
  const {
    x,
    y,
    showMenu,
    setShowMenu,
    editable,
    msg,
    chatId,
    messageUpperPoint,
    myUserId
  } = props;
  const [showMenuBeforeCursor, setShowMenuBeforeCursor] = useState(true);
  const [showMenuBelowCursor, setShowMenuBelowCursor] = useState(true);
  const handleCloseMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      setShowMenu(false);
    }
  };

  const width = useResponsive();
  const socket = useSocket();
  const dispatch = useDispatch();
  /* const {replyToMessage: reply, editMessage: edit, forwardMessage: forward} = useSelector((state: ReduxState) => state.ui) */
  useEffect(() => {
    function preventWindowScroll(e: Event) {
      e.preventDefault();
    }
    if (showMenu) {
      window.addEventListener("scroll", preventWindowScroll);
    }
    () => {
      return window.removeEventListener("scroll", preventWindowScroll);
    };
  }, [showMenu]);

  useEffect(() => {
    if (width - x < 200) {
      setShowMenuBeforeCursor(false);
    } else {
      setShowMenuBeforeCursor(true);
    }
    if (window.innerHeight - y < 200) {
      setShowMenuBelowCursor(false);
    } else {
      setShowMenuBelowCursor(true);
    }
  }, [width, x, y]);

  function deleteMessage() {
    setShowMenu(false);
    socket.emit("delete-message", { messageId: msg._id, chatId });
  }

  function editMessage() {
    setShowMenu(false);
    dispatch(
      handleEditMessage({ message: msg, show: true, messageUpperPoint })
    );
  }
  function replyToMessage() {
    setShowMenu(false);
    dispatch(
      handleReplytoMessage({ message: msg, show: true, messageUpperPoint, senderId: myUserId })
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showMenu ? 1 : 0,
        pointerEvents: showMenu ? "all" : "none",
      }}
      className="overlay fixed top-0 z-20 right-0 bottom-0 left-0 "
      onClick={handleCloseMenu}
      onContextMenu={handleCloseMenu}
    >
      <motion.div
        style={{
          top: showMenuBelowCursor ? y : y - 185,
          left: showMenuBeforeCursor ? x : x - 154,
        }}
        className="absolute bg-slate-800 py-[0.7rem] px-[.3rem] rounded-xl"
      >
        <div
          className="flex items-center gap-[1.5rem] pl-[.9rem] pr-[5rem] py-[.5rem] rounded-lg hover:bg-slate-700 duration-200 cursor-pointer"
          onClick={replyToMessage}
        >
          <BsReply className="w-[2rem] h-[2rem]" />
          <span className="font-medium text-xl ">Reply</span>
        </div>

        {editable && showMenu && (
          <div
            className="flex items-center gap-[1.5rem] pl-[.9rem] pr-[5rem] py-[.5rem] rounded-lg hover:bg-slate-700 duration-200 cursor-pointer"
            onClick={editMessage}
          >
            <HiOutlinePencil className="w-[1.7rem] h-[1.7rem]" />
            <span className="font-medium text-xl ">Edit</span>
          </div>
        )}

        <div className="flex items-center gap-[1.5rem] pl-[.9rem] pr-[5rem] py-[.5rem] rounded-lg hover:bg-slate-700 duration-200 cursor-pointer">
          <IoCopyOutline className="w-[1.5rem] h-[1.5rem]" />
          <span className="font-medium text-xl ">Copy</span>
        </div>
        <div className="flex items-center gap-[1.5rem] pl-[.9rem] pr-[5rem] py-[.5rem] rounded-lg hover:bg-slate-700 duration-200 cursor-pointer">
          <BsFillPinAngleFill className="w-[1.5rem] h-[1.5rem]" />
          <span className="font-medium text-xl ">Pin</span>
        </div>
        <div className="flex items-center gap-[1.5rem] pl-[.9rem] pr-[5rem] py-[.5rem] rounded-lg hover:bg-slate-700 duration-200 cursor-pointer">
          <BsReply
            className="w-[2rem] h-[2rem]"
            style={{ transform: "rotateY(180deg)" }}
          />
          <span className="font-medium text-xl ">Forward</span>
        </div>
        <div
          className={`${styles.deleteContainer} flex items-center gap-[1.5rem] pl-[.9rem] pr-[5rem] py-[.5rem] rounded-lg  duration-200 cursor-pointer`}
          onClick={deleteMessage}
        >
          <MdOutlineDeleteOutline className="text-red-500 w-[2rem] h-[2rem]" />
          <span className="font-medium text-xl text-red-500">Delete</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
