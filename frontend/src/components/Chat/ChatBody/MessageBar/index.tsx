import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import SendFilesPopup from "../Popups/SendFilesPopup";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { motion } from "framer-motion";
import { BsReply } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from './styles.module.scss';
interface Props {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  setInputValue: (value: string) => void;
  inputValue: string;
  setShowFilesPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setMedia: React.Dispatch<React.SetStateAction<Blob[] | null>>;
  showFilesPopup: boolean;
}
export default function MessageBar(props: Props) {
  const {
    sendMessage,
    setInputValue,
    inputValue,
    setShowFilesPopup,
    setFile,
    setMedia,
    showFilesPopup,
  } = props;
  const { replyToMessage, editMessage } = useSelector(
    (state: ReduxState) => state.ui
  );
  const dispatch = useDispatch();
  return (
    <form
      className="fixed bottom-[0] flex flex-col px-[1rem] md:w-[65%] w-full "
      onSubmit={sendMessage}
    >
      <motion.div
        initial={{ transform: "scale(100%)" }}
        className="w-full h-[5rem] bg-gray-700 rounded-t-2xl origin-bottom flex gap-[2.5rem] px-[1rem]"
      >
        <div className="flex items-center">
          {!replyToMessage.show && (
            <BsReply className="w-[2.5rem] h-[2.5rem] text-purple-500" />
          )}
          {editMessage.show && (
            <HiOutlinePencil className="w-[2.5rem] h-[2.5rem] text-purple-500" />
          )}
        </div>
        <div className="flex-1 py-[0.8rem] flex justify-between items-center">
          <div className="h-full flex gap-[0.7rem]">
            <span className="inline-block w-[0.25rem] h-full bg-purple-500"></span>
            <div className="flex flex-col justify-between">
              <span className="text-purple-500 font-semibold text-xl">
                {!replyToMessage.show && "UserName"}
                {editMessage.show && "Editing"}
              </span>
              <span className="text-lg text-gray-200">{"Message"}</span>
            </div>
          </div>
          <div>
            <IoClose className={`${styles.closeBtn} min-w-[3.5rem] min-h-[3.5rem] text-gray-300 p-[0.7rem] rounded-full cursor-pointer`} />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
        animate={{
          borderTopLeftRadius: replyToMessage.show ? 0 : "1rem",
          borderTopRightRadius: replyToMessage.show ? 0 : "1rem",
        }}
        className="w-full max-w-full flex items-center bg-gray-700 px-[1rem] py-[1rem] rounded-b-2xl"
      >
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
        <div className="relative min-w-[3.2rem] min-h-[3.2rem] max-w-[3.2rem] max-h-[3.2rem]">
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
      </motion.div>
    </form>
  );
}
