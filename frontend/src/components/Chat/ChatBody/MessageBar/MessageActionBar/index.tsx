import { BsReply } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "../styles.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import { handleScrollToMessage } from "../../../../../state/message";
import getActionBarMessageContent from "../../../../../utils/getActionBarMessageContent";
import renderMediaContent from "../../../../../utils/renderActionBarMediaContent";
import {
  closeEditMessage,
  closeReplyMessage,
} from "../../../../../utils/reduxHelpers";
interface Props {
  setInputValue: (value: string) => void;
}

export default function MessageActionBar(props: Props) {
  const { setInputValue } = props;
  const { replyToMessage, editMessage } = useSelector(
    (state: ReduxState) => state.message
  );
  const dispatch = useDispatch();

  function handleCloseActionBar() {
    if (replyToMessage.show) {
      dispatch(closeReplyMessage());
    }
    if (editMessage.show) {
      dispatch(closeEditMessage());
    }
    setInputValue("");
  }
  function scrollToMessage() {
    if (replyToMessage.show) {
      dispatch(
        handleScrollToMessage({
          top: replyToMessage.messageUpperPoint as number,
        })
      );
    }
    if (editMessage.show) {
      dispatch(
        handleScrollToMessage({
          top: editMessage.messageUpperPoint as number,
        })
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={{
        opacity: replyToMessage.show || editMessage.show ? 1 : 0,
        display: replyToMessage.show || editMessage.show ? "flex" : "none",
      }}
      className="w-full h-[5rem] bg-gray-700 rounded-t-2xl origin-bottom gap-[2.5rem] px-[1rem]"
    >
      <div className="flex items-center">
        {replyToMessage.show && (
          <BsReply className="w-[2.5rem] h-[2.5rem] text-purple-500" />
        )}
        {editMessage.show && (
          <HiOutlinePencil className="w-[2.5rem] h-[2.5rem] text-purple-500" />
        )}
      </div>
      <div className="flex-1 py-[0.8rem] flex justify-between items-center">
        <div
          className="h-full flex gap-[0.7rem] flex-1"
          onClick={scrollToMessage}
        >
          <span className="inline-block w-[0.25rem] h-full bg-purple-500"></span>
          {(replyToMessage.mediaPath || editMessage.mediaPath) && (
            <div className="w-[3rem] h-[3rem] rounded-lg overflow-hidden">
              {renderMediaContent(replyToMessage)}
              {renderMediaContent(editMessage)}
            </div>
          )}

          <div className="flex flex-col justify-between">
            <span className="text-purple-500 font-semibold text-xl">
              {replyToMessage.show && "UserName"}
              {editMessage.show && "Editing"}
            </span>
            <div>
              <span className="text-lg text-gray-200">
                {getActionBarMessageContent(replyToMessage)}
                {getActionBarMessageContent(editMessage)}
              </span>
            </div>
          </div>
        </div>
        <div>
          <IoClose
            className={`${styles.closeBtn} min-w-[3.5rem] min-h-[3.5rem] text-gray-300 p-[0.7rem] rounded-full cursor-pointer`}
            onClick={handleCloseActionBar}
          />
        </div>
      </div>
    </motion.div>
  );
}
