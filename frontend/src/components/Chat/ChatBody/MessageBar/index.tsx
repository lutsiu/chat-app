import { GoPaperclip } from "react-icons/go";
import { FaRegSmile } from "react-icons/fa";
import SendFilesPopup from "../Popups/SendFilesPopup";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import MessageActionBar from "./MessageActionBar";
import {
  handleEditMessage,
  handleReplytoMessage,
} from "../../../../state/message";
import { MessageType } from "../../../../interfaces/message";
import { IMessage } from "../../../../interfaces/models";
interface Props {
  sendMessage: (
    action: MessageType,
    e: React.FormEvent<HTMLFormElement>
  ) => void;
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

  const formRef = useRef<null | HTMLFormElement>(null);
  const submitForm = () => {
    const syntheticEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    // Find the form element using the ref
    const formElement = formRef.current;

    if (formElement) {
      formElement.dispatchEvent(syntheticEvent);
    }
  };

  const dispatch = useDispatch();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    if (replyToMessage.show) {
      sendMessage(
        {
          reply: {
            messageToReplyId: replyToMessage.message?._id as string,
            senderId: replyToMessage.senderId,
          },
          editMessage: null,
          sendMessage: false,
        },
        e
      );
      dispatch(
        handleReplytoMessage({
          message: null,
          show: false,
          messageUpperPoint: undefined,
          senderId: "",
        })
      );
    }
    if (editMessage.show) {
      sendMessage(
        {
          reply: null,
          sendMessage: false,
          editMessage: { messageId: editMessage.message?._id },
        },
        e
      );
      dispatch(
        handleEditMessage({
          message: null,
          show: false,
          messageUpperPoint: undefined,
        })
      );
    }
    if (!replyToMessage.show && !editMessage.show) {
      sendMessage({ editMessage: null, reply: null, sendMessage: true }, e);
    }
  };
  const { replyToMessage, editMessage } = useSelector(
    (state: ReduxState) => state.message
  );

  // submit form if press enter
  function handleTextAreaEnterPressed(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitForm();
    }
  }
  // set value of input if edit
  useEffect(() => {
    if (editMessage.message) {
      setInputValue(editMessage.message.message);
    }
  }, [editMessage.message, setInputValue]);

  return (
    <form
      className="fixed bottom-[0] flex flex-col px-[1rem] md:w-[65%] w-full "
      id="message-bar"
      onSubmit={handleSubmitForm}
      ref={formRef}
    >
      <MessageActionBar setInputValue={setInputValue} />
      <motion.div
        initial={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
        animate={{
          borderTopLeftRadius:
            replyToMessage.show || editMessage.show ? 0 : "1rem",
          borderTopRightRadius:
            replyToMessage.show || editMessage.show ? 0 : "1rem",
        }}
        className="w-full max-w-full flex items-end bg-gray-700 px-[1rem] py-[1rem] rounded-b-2xl"
      >
        <div>
          <FaRegSmile className="p-[0.3rem] min-w-[2.8rem] min-h-[2.8rem] text-gray-400 cursor-pointer rounded-full duration-200 hover:text-purple-500 relative" />
        </div>
        <div className="flex-1">
          <TextareaAutosize
            maxRows={15}
            placeholder="Message"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleTextAreaEnterPressed}
            autoFocus
            value={inputValue}
            name="message"
            className="message-input w-full h-[2rem] outline-none bg-transparent sm:text-2xl text-2xl font-normal px-[1rem] box-border mb-[0.4rem]"
          />
        </div>
        <div
          className="media-div relative min-w-[3.2rem] min-h-[3.2rem] max-w-[3.2rem] max-h-[3.2rem]"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest(".media-div")) {
              setShowFilesPopup((prev) => !prev);
            }
          }}
        >
          {!inputValue && (
            <>
              <GoPaperclip
                className="open-files-popup p-[0.3rem] w-full h-full text-gray-400 cursor-pointer hover:bg-gray-600 rounded-full duration-200 "
                style={{ transform: "rotateZ(180deg)" }}
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
              <IoMdSend className="open-files-popup p-[0.3rem] w-full h-full text-gray-400 cursor-pointer hover:bg-gray-600 rounded-full duration-200 " />
            </button>
          )}
        </div>
      </motion.div>
    </form>
  );
}
