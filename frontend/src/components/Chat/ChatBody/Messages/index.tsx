import { IMessage } from "../../../../interfaces/models";
import { useRef, useEffect } from "react";
import styles from "./styles.module.scss";
interface Props {
  messages: IMessage[];
  myUserId: string | undefined;
}
export default function Messages(props: Props) {
  const { messages, myUserId } = props;
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
      <ul className="2xl:px-[15rem] grid grid-cols-1 gap-y-[0.1rem]">
        {messages.map((msg, i) => {
          const { message, timeStamp, file, images, videos, sender } = msg;
          if (myUserId && sender === myUserId) {
            return (
              <li
                key={i}
                className="relative bg-purple-500 justify-self-end rounded-2xl p-[0.8rem] pr-[4rem] max-w-[70%]"
              >
                <p className="text-xl font-medium">{message}</p>
                <span className="absolute bottom-[0.7rem] right-[0.7rem]">{`${new Date(timeStamp).getHours()}: ${new Date(timeStamp).getMinutes()}`}</span>
              </li>
            );
          } else {
            return (
              <li
                key={i}
                className="relative bg-gray-700 justify-self-start rounded-2xl p-[0.8rem] max-w-[70%] pr-[4rem]"
              >
                <p className="text-xl font-medium">{message}</p>
                <span className="absolute bottom-[0.7rem] right-[0.7rem]">{`${new Date(timeStamp).getHours()}: ${new Date(timeStamp).getMinutes()}`}</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
