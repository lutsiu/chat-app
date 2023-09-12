import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import useResponsive from "../../../hooks/useResponsive";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";
import { motion } from "framer-motion";
import SendFilesPopup from "./Popups/SendFilesPopup";
import SendFile from "./Overlays/SendFile";
import MediaFilesPopup from "./Overlays/SendMedia";
export default function ChatBody() {
  const [showEmojis, setShowEmojis] = useState(false);
  const [showFilesPopup, setShowFilesPopup] = useState(false);
  const [showFileOverlay, setShowFileOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const [media, setMedia] = useState<null | Blob[]>(null);
  const [file, setFile] = useState<null | File>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const width = useResponsive();
  const handlePickEmoji = (emoji: EmojiClickData, e: MouseEvent) => {
    const pickedEmoji = emoji.emoji;
    if (inputRef.current) {
      inputRef.current.value = `${inputRef.current.value}${pickedEmoji}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
  };

  useEffect(() => {
    function handleClosePickerAndSendFiles(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("message-input") ||
        target.classList.contains("smile-picker")
      ) {
        return;
      } else {
        setShowEmojis(false);
      }
      if (
        !target.classList.contains("file-popup") &&
        !target.classList.contains("open-files-popup")
      ) {
        setShowFilesPopup(false);
      }
    }
    document.addEventListener("click", handleClosePickerAndSendFiles);
    return () => {
      document.removeEventListener("click", handleClosePickerAndSendFiles);
    };
  }, []);

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
      <div className="flex-1 w-full bg-green-400 ">
        <form className="fixed w-[100%] md:w-[60%] bottom-[1.5rem] md:ml-[2.5%] bg-gray-700 flex py-[1.5rem] px-[1.5rem] items-center rounded-2xl">
          <div>
            <FaRegSmile
              className="smile-picker p-[0.3rem] min-w-[2.8rem] min-h-[2.8rem] text-gray-400 cursor-pointer rounded-full duration-200 hover:text-purple-500 relative"
              onClick={() => setShowEmojis((prev) => !prev)}
            />
            <motion.div
              className="absolute top-[-45.5rem] left-[-0.1rem] origin-bottom-left"
              initial={{ transform: "scale(0)" }}
              animate={{
                transform: showEmojis ? "scale(100%)" : "scale(0%)",
              }}
              transition={{ duration: 0.2 }}
            >
              <EmojiPicker
                lazyLoadEmojis={true}
                skinTonesDisabled={true}
                theme={Theme.DARK}
                onEmojiClick={handlePickEmoji}
              />
            </motion.div>
          </div>
          <input
            className="h-full flex-1 px-[2rem] bg-transparent outline-none text-2xl font-normal message-input"
            placeholder="Message"
            onChange={handleInputChange}
            ref={inputRef}
            name="message"
          />
          <div className="relative">
            <AiOutlinePaperClip
              className="open-files-popup p-[0.3rem] min-w-[3.2rem] min-h-[3.2rem] text-gray-400 cursor-pointer hover:bg-gray-600 rounded-full duration-200 "
              style={{ transform: "rotateZ(180deg)" }}
              onClick={() => setShowFilesPopup((prev) => !prev)}
            />
            <SendFilesPopup
              showPopup={showFilesPopup}
              setFile={setFile}
              setMedia={setMedia}
            />
          </div>
        </form>
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
