import { IMessage } from "../../../../interfaces/models";
import { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setMessageContainerScrollTop } from "../../../../state/message";
import sortMsgsByDate from "../../../../utils/sortMsgsByDate";
import normalizeDateName from "../../../../utils/normalizeDateName";
import SkeletonElement from "../../../Widgets/SkeletonElement";

export default function Messages() {
  const { chatId, chatMessages: messages } = useSelector((state: ReduxState) => state.chat);
  const userId = useSelector((state: ReduxState) => state.user.user?._id);
  const chatContainer = useRef<null | HTMLDivElement>(null);
  const { scrollToMessage } = useSelector((state: ReduxState) => state.message);
  const [showContent, setShowContent] = useState(false);
  const dispatch = useDispatch();
  // create array of objects with date and message of the same date
  const messagesWithDates = sortMsgsByDate(messages, "day") as {
    date: string;
    messages: IMessage[];
  }[];

  // scroll to the end while renderring for the first time
  useEffect(() => {
    setTimeout(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
      }
    }, 500);
    setShowContent(true);
  }, [messages]);
  const PINNED_MESSAGES_BAR_HEIGHT = 43;
  const pinnedMessages = messages.filter((msg) => msg.pinned).length > 0;
  // scroll to a necessary message if scrollToMessage is triggered
  useEffect(() => {
    if (scrollToMessage && chatContainer.current) {
      chatContainer.current.scroll({
        top: pinnedMessages
          ? scrollToMessage.top - PINNED_MESSAGES_BAR_HEIGHT
          : scrollToMessage.top,
        behavior: "smooth",
      });
    }
  }, [pinnedMessages, scrollToMessage]);

  // scroll function for pinned messages
  useEffect(() => {
    function handleScroll() {
      if (chatContainer.current) {
        const { scrollTop } = chatContainer.current;

        dispatch(setMessageContainerScrollTop(scrollTop));
      }
    }
    chatContainer.current?.addEventListener("scroll", handleScroll);

    return () => {
      chatContainer.current?.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <div
      className={`${styles.containerHeight} overflow-y-scroll box-border`}
      style={{ scrollBehavior: "smooth" }}
      ref={chatContainer}
    >
      <ul
        className="2xl:px-[15rem] px-[1rem]"
        style={{
          paddingTop:
            messages.filter((msg) => msg.pinned).length > 0
              ? `${PINNED_MESSAGES_BAR_HEIGHT + 3}px `
              : "",
        }}
      >
        {showContent &&
          messagesWithDates.map((msg, i) => {
            const { messages, date } = msg;
            const dateToShow = normalizeDateName(date);
            return (
              <div
                key={i}
                className="w-full grid grid-cols-1 gap-y-[0.3rem] relative message-block"
                data-date={date}
              >
                <span
                  className={`${styles["date-header"]} justify-self-center my-[1rem] p-[.5rem] rounded-2xl font-medium text-xl`}
                  id={"message-block-time-span"}
                >
                  {dateToShow}
                </span>
                {messages.map((msg, i) => {
                  return (
                    <Message
                      key={i}
                      msg={msg}
                    />
                  );
                })}
              </div>
            );
          })}
      </ul>
    </div>
  );
}
