import { motion } from "framer-motion";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsChatLeft, BsFillReplyFill } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useResponsive from "../../../../../../hooks/useResponsive";
import { useSocket } from "../../../../../../context/SocketContext";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import downloadFile from "../../../../../../utils/downloadFile";
import { handleScrollToMessage } from "../../../../../../state/message";
import { ReduxState } from "../../../../../../interfaces/redux";
import { setShowContentContextMenu } from "../../../../../../state/chatUI";

export default function ContentContextMenu() {
  const { x, y, showMenu, message, file } = useSelector((state: ReduxState) => {
    return state.chatUI.contentContextMenu;
  });
  const { chatId } = useSelector((state: ReduxState) => state.chat);
  const [showMenuBeforeCursor, setShowMenuBeforeCursor] = useState(true);
  const [showMenuBelowCursor, setShowMenuBelowCursor] = useState(true);

  const width = useResponsive();
  const socket = useSocket();
  const dispatch = useDispatch();

  const handleCloseMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      dispatch(
        setShowContentContextMenu({
          file: null,
          x: null,
          y: null,
          message: null,
          showMenu: false,
        })
      );
    }
  };

  function deleteMessage() {
    if (!message || !file) return;
    if (message.media.length > 1) {
      return socket.emit("delete-media", {
        messageId: message._id,
        chatId,
        filePath: file.filePath,
      });
    }
    socket.emit("delete-message", { messageId: message._id, chatId });
    dispatch(
      setShowContentContextMenu({
        file: null,
        x: null,
        y: null,
        message: null,
        showMenu: false,
      })
    );
  }

  function scrollToMessage() {
    if (!message) return;
    const messageDOM = document.getElementById(
      message._id as string
    ) as HTMLElement;
    const messageParent = messageDOM?.parentElement as HTMLElement;
    dispatch(
      handleScrollToMessage({
        top: messageParent?.offsetTop + messageDOM.offsetTop,
      })
    );
  }

  function handleDownloadFile() {
    if (!file) return;
    downloadFile(file);
  }
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
    if (!x || !y) return;
    if (width - x < 200) {
      setShowMenuBeforeCursor(false);
    } else {
      setShowMenuBeforeCursor(true);
    }
    if (window.innerHeight - y < 144.5) {
      setShowMenuBelowCursor(false);
    } else {
      setShowMenuBelowCursor(true);
    }
  }, [width, x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showMenu ? 1 : 0,
        pointerEvents: showMenu ? "all" : "none",
      }}
      className="overlay fixed top-0 z-20 right-0 bottom-0 left-0 "
      onClick={handleCloseMenu}
    >
      {x && y && (
        <motion.div
          style={{
            top: showMenuBelowCursor ? y : y - 144.5,
            left: showMenuBeforeCursor ? x : x - 154,
          }}
          className="absolute bg-slate-800 py-[0.7rem] px-[.3rem] rounded-xl flex flex-col gap-[.7rem]"
        >
          <div className="flex items-center gap-[1.7rem] pl-[1rem] pr-[2rem] hover:bg-slate-700 duration-150 py-[.4rem] cursor-pointer">
            <div style={{ transform: "rotateY(180deg)" }}>
              <BsFillReplyFill className="w-[2rem] h-[2rem]" />
            </div>
            <p className="font-semibold text-xl">Forward</p>
          </div>
          <div
            className="flex items-center gap-[1.7rem] pl-[1rem] pr-[2rem] hover:bg-slate-700 duration-150 py-[.4rem] cursor-pointer"
            onClick={handleDownloadFile}
          >
            <div>
              <LiaDownloadSolid className="w-[2rem] h-[2rem]" />
            </div>
            <p className="font-semibold text-xl">Download</p>
          </div>
          <div
            className="flex items-center gap-[1.7rem] pl-[1rem] pr-[2rem] hover:bg-slate-700 duration-150 py-[.4rem] cursor-pointer"
            onClick={scrollToMessage}
          >
            <div>
              <BsChatLeft className="w-[1.4rem] h-[1.4rem] ml-[.4rem]" />
            </div>
            <p className="font-semibold text-xl">Show in chat</p>
          </div>
          <div
            className={`${styles.deleteContainer} text-red-500 flex items-center gap-[1.7rem] pl-[1rem] pr-[2rem] hover:bg-slate-700 duration-150 py-[.4rem] cursor-pointer`}
            onClick={deleteMessage}
          >
            <div>
              <MdOutlineDeleteOutline className="w-[2rem] h-[2rem]" />
            </div>
            <p className="font-semibold text-xl">Delete</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
