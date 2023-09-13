import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import SendFilesPopup from "../Popups/SendFilesPopup";
import { IoMdSend } from "react-icons/io";
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
  return (
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
      </div>
    </form>
  );
}
