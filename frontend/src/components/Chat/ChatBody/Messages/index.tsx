import { IMessage } from "../../../../interfaces/models";
import { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import MessageContextMenu from "./ContextMenu";
import Message from "./Message";
interface Props {
  messages: IMessage[];
  myUserId: string | undefined;
  chatId: string;
}
export default function Messages(props: Props) {
  const { messages, myUserId, chatId} = props;
  const chatContainer = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (chatContainer.current) {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
      }
    }, 10);
  }, [messages]);

  return (
    <div
      className={`${styles.containerHeight} overflow-y-scroll box-border`}
      ref={chatContainer}
    >
      <ul className="2xl:px-[15rem] grid grid-cols-1 gap-y-[0.2rem]">
        {messages.map((msg, i) => {
          const { sender } = msg;
          if (myUserId && sender === myUserId) {
            return <Message key={i} myUserId={myUserId} msg={msg} chatId={chatId} />;
          } else {
            return <Message key={i} myUserId={myUserId} msg={msg} chatId={chatId} />;
          }
        })}
      </ul>
    </div>
  );
}
