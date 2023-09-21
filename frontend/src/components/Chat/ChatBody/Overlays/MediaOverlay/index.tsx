import { motion } from "framer-motion";
import { MdOutlineDelete } from "react-icons/md";
import { BsFillReplyFill } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import { HiOutlineZoomIn, HiOutlineZoomOut } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import styles from "./styles.module.scss";
import { IMessage } from "../../../../../interfaces/models";
import { useSocket } from "../../../../../context/SocketContext";
import { useState } from "react";
import downloadFile from "../../../../../utils/downloadFile";
interface Props {
  setShowOverlay: (show: boolean) => void;
  showOverlay: boolean;
  mediaSrc: string;
  mediaType: "image" | "video";
  message: IMessage;
  chatId: string;
}

export default function MediaOverlay(props: Props) {
  const { showOverlay, setShowOverlay, mediaSrc, mediaType, message, chatId } =
    props;
  const [mediaScale, setMediaScale] = useState(20);
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
    socket.emit("delete-message", { chatId, messageId: message._id });
    setShowOverlay(false);
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

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
      }}
      className={`${styles.overlay} media-overlay fixed top-0 bottom-0 right-0 left-0 z-[100] flex justify-center items-center`}
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
        <div className={styles["icon-container"]} onClick={() => downloadFile(message)}>
          <LiaDownloadSolid className="w-[2.8rem] h-[2.8rem] text-gray-500 duration-500" />
        </div>
        <div className={styles["icon-container"]}>
          {!showProgressBar && (
            <HiOutlineZoomIn
              className="w-[2.4rem] h-[2.4rem] text-gray-500 duration-500"
              onClick={() => {
                zoomIn();
                setShowProgressBar(true)
              }}
              />
              )}
          {showProgressBar && (
            <HiOutlineZoomOut
            className="w-[2.4rem] h-[2.4rem] text-gray-500 duration-500"
            onClick={() => {
              zoomOut()
              setShowProgressBar(false)
              }}
            />
          )}
        </div>
        <div
          className={styles["icon-container"]}
          onClick={handleCloseMediaOverlay}
        >
          <IoMdClose className="close-overlay w-[2.8rem] h-[2.8rem] text-gray-500 duration-500" />
        </div>
      </div>
      <div
        className="md:max-w-[35rem] md:max-h-[35rem] duration-200 ease-out"
        style={{
          scale: `${100 + mediaScale * 3}%`,
        }}
      >
        {mediaType === "image" && (
          <img className="w-full h-full object-cover" src={mediaSrc} />
        )}
      </div>
      <div
        className="absolute bottom-[2rem] right-[50%] items-center gap-[1rem] flex p-[1.8rem] rounded-xl duration-500"
        style={{
          transform: `translateX(50%)`,
          backgroundColor: "rgba(0,0,0,.5)",
          opacity: progressBarWasTouched || showProgressBar ? 1 : 0,
          pointerEvents: progressBarWasTouched || showProgressBar ? "auto" : "none"
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
