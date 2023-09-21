import { IMessage } from "../../../../interfaces/models";
import { useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setMessageContainerScrollTop } from "../../../../state/message";
interface Props {
  messages: IMessage[];
  myUserId: string | undefined;
  chatId: string;
}
export default function Messages(props: Props) {
  const { messages, myUserId, chatId } = props;
  const chatContainer = useRef<null | HTMLDivElement>(null);
  const { scrollToMessage } = useSelector((state: ReduxState) => state.message);
  const CHAT_BODY_HEADER_HEIGHT = 52;
  const dispatch = useDispatch();
  // scroll to the end while renderring for the first time
  useEffect(() => {
    setTimeout(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
      }
    }, 10);
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


  return (
    <div
      className={`${styles.containerHeight} overflow-y-scroll box-border`}
      ref={chatContainer}
    >
      <ul
        className="2xl:px-[15rem] grid grid-cols-1 gap-y-[0.2rem]"
        style={{
          paddingTop:
            messages.filter((msg) => msg.pinned).length > 0 ? `${PINNED_MESSAGES_BAR_HEIGHT + 3}px ` :'',
        }}
      >
        {messages.map((msg, i) => {
          const { sender } = msg;
          if (myUserId && sender === myUserId) {
            return (
              <Message key={i} myUserId={myUserId} msg={msg} chatId={chatId} />
            );
          } else {
            return (
              <Message key={i} myUserId={myUserId} msg={msg} chatId={chatId} />
            );
          }
        })}
      </ul>
    </div>
  );
}
