import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import useResponsive from "../../../hooks/useResponsive";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";
import { motion } from "framer-motion";
import SendFilesPopup from "./Popups/SendFilesPopup";
import SendFile from "./Overlays/SendFile";
import MediaFilesPopup from "./Overlays/SendMedia";
import socket from "../../../utils/socketIo";
import { IoMdSend } from "react-icons/io";
export default function ChatBody() {
  const [showEmojis, setShowEmojis] = useState(false);
  const [showFilesPopup, setShowFilesPopup] = useState(false);
  const [showFileOverlay, setShowFileOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const [media, setMedia] = useState<null | Blob[]>(null);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<null | File>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const width = useResponsive();

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

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log(inputValue);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex-1 w-full">
        <form
          className="fixed bottom-[2rem] flex gap-[1rem] px-[1rem] md:w-[65%] w-full "
          onSubmit={sendMessage}
        >
          <div className="flex-1 max-w-full flex items-center rounded-2xl bg-gray-700 px-[1rem] py-[1rem]">
            <div>
              <FaRegSmile className="p-[0.3rem] min-w-[2.8rem] min-h-[2.8rem] text-gray-400 cursor-pointer rounded-full duration-200 hover:text-purple-500 relative" />
            </div>
            <div className="flex-1">
              <input
                placeholder="Message"
                onChange={(e) => setInputValue(e.currentTarget.value)}
                value={inputValue}
                name="message"
                className="message-input w-full outline-none bg-transparent sm:text-2xl text-2xl font-normal px-[1rem] box-border"
              />
            </div>
            <div  className="relative min-w-[3.2rem] min-h-[3.2rem] max-w-[3.2rem] max-h-[3.2rem]">
              {!inputValue && (
                <>
                  <AiOutlinePaperClip
                    className="open-files-popup p-[0.3rem] w-full h-full text-gray-400 cursor-pointer hover:bg-gray-600 rounded-full duration-200 "
                    style={{ transform: "rotateZ(180deg)" }}
                    onClick={() => setShowFilesPopup((prev) => !prev)}
                  />
                  <SendFilesPopup
                    showPopup={showFilesPopup}
                    setFile={setFile}
                    setMedia={setMedia}
                  />
                </>
              )}
              {inputValue && (
                <button type="submit" className="w-full h-full">
                  <IoMdSend
                    className="open-files-popup p-[0.3rem] w-full h-full text-gray-400 cursor-pointer hover:bg-gray-600 rounded-full duration-200 "
                    onClick={() => setShowFilesPopup((prev) => !prev)}
                  />
                </button>
              )}
            </div>
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

/* <form className="fixed bottom-[2rem] flex gap-[1rem] px-[1rem] md:w-[65%] w-full max-w-full">
          <div className="flex-1 max-w-full flex items-center rounded-2xl bg-gray-700 px-[1rem]">
            <div>
              <FaRegSmile
                className="smile-picker p-[0.3rem] min-w-[2.8rem] min-h-[2.8rem] text-gray-400 cursor-pointer rounded-full duration-200 hover:text-purple-500 relative"
                onClick={() => setShowEmojis((prev) => !prev)}
              />
              <motion.div
                className="absolute top-[-45.5rem] left-[1rem] origin-bottom-left"
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
          </div>
          <button
            type="submit"
            className=" flex items-center justify-center  p-[1.7rem] rounded-full bg-purple-500 duration-200 hover:bg-purple-600 cursor-pointer"
          >
            <IoMdSend className="text-4xl" />
          </button>
        </form> */
