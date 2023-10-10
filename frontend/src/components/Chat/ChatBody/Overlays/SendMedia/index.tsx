import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./stylesSendMedia.module.scss";
import { useSocket } from "../../../../../context/SocketContext";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
interface Props {
  media: Blob[] | null;
  showOverlay: boolean,
  setMedia: React.Dispatch<React.SetStateAction<Blob[] | null>>;
}
export default function SendMedia(props: Props) {
  const { media, showOverlay, setMedia} =
    props;
    const {chatId} = useSelector((state: ReduxState) => state.chat);
  const {user} = useSelector((state: ReduxState) => state.user);
  const userId = user?._id;
  const formRef = useRef<null | HTMLFormElement>(null);
  const socket = useSocket();
  let headerTitle = "files";

  let mediaContainerClasses = `${styles["media-container"]}`;
  let mediaClasses = `${styles.img}`;
  if (media) {
    // header title
    if (media.length === 1) {
      headerTitle = media[0].type.includes("video") ? "video" : "image";
    } else [(headerTitle = `${media.length} files`)];
    // styles for media container and images
    if (media.length === 1) {
      mediaContainerClasses += ` ${styles["one-col"]}`;
      mediaClasses += ` ${styles["one-img"]}`;
    }
    if (media.length === 2) {
      mediaContainerClasses += ` ${styles["two-cols"]}`;
      mediaClasses += ` ${styles["two-imgs"]}`;
    }
    if (media.length === 3) {
      mediaContainerClasses += ` ${styles["three-cols"]}`;
      mediaClasses += ` ${styles["three-imgs"]}`;
    }
    if (media.length === 4) {
      mediaContainerClasses += ` ${styles["four-cols"]}`;
      mediaClasses += ` ${styles["four-imgs"]}`;
    }
    if (media.length === 5) {
      mediaContainerClasses += ` ${styles["five-cols"]}`;
      mediaClasses += ` ${styles["five-imgs"]}`;
    }
    if (media.length === 6) {
      mediaContainerClasses += ` ${styles["six-cols"]}`;
      mediaClasses += ` ${styles["six-imgs"]}`;
    }
  }

  useEffect(() => {
    const handleCloseOverlay = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("media-overlay") ||
        target.classList.contains("close-overlay")
      ) {
        setMedia(null);
        setTimeout(() => {
          setMedia(null);
        }, 1000);
      }
    };
    document.addEventListener("click", handleCloseOverlay);
    return () => {
      document.removeEventListener("click", handleCloseOverlay);
    };
  }, [setMedia]);

  function sendMedia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formRef.current && media) {
      const formData = new FormData(formRef.current);
      const mediaToSend = media.map((md) => {
        return {
          media: md,
          fileName: md.name,
          fileSize: md.size,
          fileType: md.type,
        };
      });
      const dataToSend = {
        media: mediaToSend,
        message: formData.get("message"),
        chatId,
        userId,
      };
      socket.emit('send-message-with-media', dataToSend)
      formRef.current.reset();
      setMedia(null)
    }
  }

  return (
    <motion.div
      className="media-overlay fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-10"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
      }}
    >
      <motion.form
        initial={{ y: 100 }}
        animate={{
          y: showOverlay ? 0 : 100,
        }}
        className="flex flex-col gap-[1.5rem] p-[1rem] bg-slate-800 rounded-xl w-[40rem]"
        onSubmit={sendMedia}
        ref={formRef}
      >
        <div className="flex items-center gap-[2rem]">
          <div>
            <IoCloseOutline className="close-overlay p-[0.4rem] min-h-[3rem] min-w-[3rem] hover:bg-slate-700 duration-200 rounded-full cursor-pointer text-gray-300" />
          </div>
          <span className="text-3xl font-medium">Send {headerTitle}</span>
        </div>
        <div className={mediaContainerClasses}>
          {media?.map((mediaItem, i) => {
            if (!mediaItem.type.includes("video")) {
              return (
                <img
                  key={i}
                  src={URL.createObjectURL(mediaItem)}
                  className={mediaClasses}
                />
              );
            } else
              return (
                <video key={i} className={mediaClasses}>
                  <source
                    src={URL.createObjectURL(mediaItem)}
                    type={mediaItem.type}
                  />
                </video>
              );
          })}
        </div>
        <div className="flex gap-[1rem]">
          <input
            type="text"
            name="message"
            placeholder="Add a caption..."
            className=" bg-transparent outline-none text-xl font-medium flex-1"
          />
          <button
            type="submit"
            className="p-[1rem] bg-purple-500  text-2xl font-medium rounded-2xl"
          >
            SEND
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
