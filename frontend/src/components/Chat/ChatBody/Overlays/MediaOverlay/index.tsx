import { motion } from "framer-motion";
import { MdOutlineDelete } from "react-icons/md";
import { BsFillReplyFill } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiOutlineZoomIn, HiOutlineZoomOut } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import styles from "./styles.module.scss";
import { useSocket } from "../../../../../context/SocketContext";
import { useEffect, useState } from "react";
import downloadFile from "../../../../../utils/downloadFile";
import { IFile, IMessage } from "../../../../../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
interface Props {
  setShowOverlay: (show: boolean) => void;
  showOverlay: boolean;
  file: IFile;
  message: IMessage;
}

export default function MediaOverlay(props: Props) {
  const { showOverlay, setShowOverlay, file, message,  } = props;
  const {chatId} = useSelector((state: ReduxState) => state.chat);
  const [mediaScale, setMediaScale] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressBarWasTouched, setProgressBarWasTouched] = useState(false);
  const socket = useSocket();
  function handleCloseMediaOverlay(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("media-overlay") ||
      target.classList.contains("close-overlay")
    ) {
      setShowOverlay(false);
    }
  }
  function handleDeleteMessage() {
    setShowOverlay(false);
    if (message.media.length > 1) {
      return socket.emit("delete-media", {
        messageId: message._id,
        chatId,
        filePath: file.filePath,
      });
    }
    socket.emit("delete-message", { messageId: message._id, chatId });
  }

  function zoomIn() {
    if (mediaScale > 80) {
      setMediaScale(100);
    }
    if (mediaScale >= 100) {
      return;
    }
    setMediaScale((prev) => prev + 20);
  }
  function zoomOut() {
    if (mediaScale < 20) {
      return setMediaScale(0);
    }
    if (mediaScale <= 0) {
      return;
    }
    setMediaScale((prev) => prev - 20);
  }

  useEffect(() => {
    function handleCloseOverlay(e: KeyboardEvent) {
      const event = e as KeyboardEventInit;
      if (event.key === "Escape") {
        setShowOverlay(false);
      }
    }
    if (showOverlay) {
      document.addEventListener("keydown", handleCloseOverlay);
    }
  }, [showOverlay, setShowOverlay]);
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
      }}
      className={`${styles.overlay} media-overlay fixed top-0 bottom-0 right-0 left-0 z-[100] flex items-center justify-center`}
      onClick={handleCloseMediaOverlay}
    >
      <div className="absolute top-0 flex items-center gap-[2rem] right-0 p-[1.6rem] z-[2]">
        <div className={styles["icon-container"]} onClick={handleDeleteMessage}>
          <MdOutlineDelete className="w-[2.8rem] h-[2.8rem] text-gray-500 duration-500" />
        </div>
        <div className={styles["icon-container"]}>
          <BsFillReplyFill
            className="w-[2.8rem] h-[2.8rem] text-gray-500 duration-500"
            style={{ transform: "rotateY(180deg)" }}
          />
        </div>
        <div
          className={styles["icon-container"]}
          onClick={() => downloadFile(file)}
        >
          <LiaDownloadSolid className="w-[2.8rem] h-[2.8rem] text-gray-500 duration-500" />
        </div>
        <div className={styles["icon-container"]}>
          {!showProgressBar && (
            <HiOutlineZoomIn
              className="w-[2.4rem] h-[2.4rem] text-gray-500 duration-500"
              onClick={() => {
                zoomIn();
                setShowProgressBar(true);
              }}
            />
          )}
          {showProgressBar && (
            <HiOutlineZoomOut
              className="w-[2.4rem] h-[2.4rem] text-gray-500 duration-500"
              onClick={() => {
                zoomOut();
                setShowProgressBar(false);
              }}
            />
          )}
        </div>
        <div
          className={styles["icon-container"]}
          onClick={handleCloseMediaOverlay}
        >
          <VscChromeClose className="close-overlay w-[2.8rem] h-[2.8rem] text-gray-500 duration-500" />
        </div>
      </div>
      <div
        className={`max-w-[35rem] max-h-[40rem] duration-200 ease-out ${styles["media-container"]}`}
        style={{
          scale: `${100 + mediaScale * 3}%`,
        }}
      >
        {file.fileType.includes("image") && (
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:3000/${file.filePath}`}
          />
        )}
        {file.fileType.includes("video") && (
          <video className="object-cover h-full w-full" controls>
            <source
              src={`http://localhost:3000/${file.filePath}`}
              type={file.fileType}
            />
          </video>
        )}
      </div>
      <div
        className="absolute bottom-[2rem] right-[50%] items-center gap-[1rem] flex p-[1.8rem] rounded-xl duration-500"
        style={{
          transform: `translateX(50%)`,
          backgroundColor: "rgba(0,0,0,.5)",
          opacity:
            showOverlay && (progressBarWasTouched || showProgressBar) ? 1 : 0,
          pointerEvents:
            showOverlay && (progressBarWasTouched || showProgressBar)
              ? "auto"
              : "none",
        }}
      >
        <div onClick={zoomOut}>
          <HiOutlineZoomOut className="w-[2rem] h-[2rem] cursor-pointer" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={mediaScale}
          onChange={(e) => {
            setProgressBarWasTouched(true);
            setMediaScale(+e.target.value);
          }}
          className="duration-200 ease-in-out"
        />
        <div onClick={zoomIn}>
          <HiOutlineZoomIn className="w-[2rem] h-[2rem] cursor-pointer" />
        </div>
      </div>
    </motion.div>
  );
}
