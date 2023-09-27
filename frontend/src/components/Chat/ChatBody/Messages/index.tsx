import { IMessage } from "../../../../interfaces/models";
import { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setMessageContainerScrollTop } from "../../../../state/message";
import getDate from "../../../../utils/getDate";
import sortMsgsByDate from "../../../../utils/sortMsgsByDate";
import normalizeDateName from "../../../../utils/normalizeDateName";
interface Props {
  messages: IMessage[];
  myUserId: string | undefined;
  chatId: string;
}
export default function Messages(props: Props) {
  const { messages, myUserId, chatId } = props;
  const chatContainer = useRef<null | HTMLDivElement>(null);
  const { scrollToMessage } = useSelector((state: ReduxState) => state.message);
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
    }, 50);
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
  }, [dispatch]);
  /* useEffect(() => {
    function scroll(e:Event) {
      const target = e.target as HTMLElement;
      const viewportHeight = window.innerHeight;
      const messageBlocks = document.querySelectorAll('.message-block') ;
      const rectTops: {rectTop: number, date:string}[] = []
      messageBlocks.forEach((block) => {
        const blockAsHTML = block as HTMLElement;
        const date = block.getAttribute('data-date') as string;
        const offsetTop = blockAsHTML.offsetTop;
        const rectTop = blockAsHTML.getBoundingClientRect().top;
        console.log('date', date,'rect:', rectTop, 'offset:', offsetTop, 'container', messagesContainerScrollTop, 'viewport:', viewportHeight - 52);
        const belowViewPort = rectTop > viewportHeight - 52;
        console.log(offsetTop < messagesContainerScrollTop! + 43, 'date', date);
        rectTops.push({date ,rectTop})
      })
      const closest = rectTops.filter((rect) => rect.rectTop < viewportHeight).at(-2);
      console.log(closest)
      setDateForStickyheader(closest?.date as string)
    }
    chatContainer.current?.addEventListener('scroll', scroll);
  }, [messagesContainerScrollTop]); */
  return (
    <div
      className={`${styles.containerHeight} overflow-y-scroll box-border`}
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
        {messagesWithDates.map((msg, i) => {
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
                const { sender } = msg;
                return (
                  <Message
                    key={i}
                    myUserId={myUserId}
                    msg={msg}
                    chatId={chatId}
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

/* 
.stickyDate {
  @apply sticky top-[0] left-[50%] z-[2] w-fit rounded-3xl p-[.6rem];
  transform: translateX(-50%);
  background-color: rgba(147, 51, 234, .7);
} */
