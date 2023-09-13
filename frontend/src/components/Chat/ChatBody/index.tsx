import { useState, useEffect } from "react";
import useResponsive from "../../../hooks/useResponsive";
import SendFile from "./Overlays/SendFile";
import MediaFilesPopup from "./Overlays/SendMedia";
import { useSocket } from "../../../context/SocketContext";
import MessageBar from "./MessageBar";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
export default function ChatBody() {
  const [showFilesPopup, setShowFilesPopup] = useState(false);
  const [showFileOverlay, setShowFileOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const [media, setMedia] = useState<null | Blob[]>(null);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<null | File>(null);
  const {user} = useSelector((state: ReduxState) => state.user);
  const width = useResponsive();
  const socket = useSocket();
  useEffect(() => {
    function handleCloseSendFiles(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        !target.classList.contains("file-popup") &&
        !target.classList.contains("open-files-popup")
      ) {
        setShowFilesPopup(false);
      }
    }
    document.addEventListener("click", handleCloseSendFiles);
    return () => {
      document.removeEventListener("click", handleCloseSendFiles);
    };
  }, []);

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (inputValue.trim() !== "") {
        socket.emit("chatMessage", {message: inputValue, userId: user?._id});
        setInputValue("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    socket.on("chatMessage", (message: {message: string, userId: string}) => {
      console.log("Received msg:", message);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, [socket]);

  useEffect(() => {
    if (file) {
      setShowFileOverlay(true);
    }
    if (media) {
      setShowMediaOverlay(true);
    }
  }, [file, media]);

  return (
    <>
      <div className="flex-1 w-full">
        <MessageBar
          sendMessage={sendMessage}
          setInputValue={setInputValue}
          inputValue={inputValue}
          setShowFilesPopup={setShowFilesPopup}
          setFile={setFile}
          setMedia={setMedia}
          showFilesPopup={showFilesPopup}
        />
      </div>
      <SendFile
        showOverlay={showFileOverlay}
        setShowOverlay={setShowFileOverlay}
        fileName={file?.name || ""}
        size={file?.size || 0}
      />
      <MediaFilesPopup
        showOverlay={showMediaOverlay}
        setShowOverlay={setShowMediaOverlay}
        media={media}
        setMedia={setMedia}
      />
    </>
  );
}
