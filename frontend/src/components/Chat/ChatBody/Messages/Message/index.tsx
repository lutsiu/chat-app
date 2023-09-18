import { IMessage } from "../../../../../interfaces/models";
import { useEffect, useRef, useState } from "react";
import MessageContextMenu from "../ContextMenu";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { handleScrollToMessage } from "../../../../../state/ui";
interface Props {
  msg: IMessage;
  myUserId: string | undefined;
  chatId: string;
}

export default function Message(props: Props) {
  const { msg, myUserId, chatId } = props;
  const { message, timeStamp, file, images, videos, sender, isEdited, reply } =
    msg;
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const [messageUpperPoint, setMessageUpperPoint] = useState<
    undefined | number
  >(undefined);

  const messageRef = useRef<null | HTMLLIElement>(null);
  
  const dispatch = useDispatch();

  const handleShowContextMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLLIElement;
    if (!target.closest(".message")) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenuX(x);
    setContextMenuY(y);
    setShowContextMenu(true);
  };

  function handleScrollToMessageYouReplied() {
    const messageToReply = document.getElementById(reply?.messageToReplyId as string);
    const top = messageToReply?.getBoundingClientRect().top;
    dispatch(handleScrollToMessage({top: top as number}))
  }

  useEffect(() => {
    if (messageRef.current) {
      const rect = messageRef.current.getBoundingClientRect();
      const upperPoint = rect.top;
      setMessageUpperPoint(upperPoint);
    }
  }, []);

  return (
    <>
      {myUserId === sender && (
        <>
          <li
            className="message relative bg-purple-500 justify-self-end rounded-2xl p-[0.8rem] max-w-[70%]"
            onContextMenu={handleShowContextMenu}
            ref={messageRef}
            id={msg._id}
          >
            {reply && reply.isReply && (
              <div
                className={`${styles.reply} duration-200 flex flex-col border-l-[.3rem] border-l-white pl-[0.8rem] mb-[0.4rem] cursor-pointer`}
                onClick={handleScrollToMessageYouReplied}
              >
                <span className="font-semibold text-lg">
                  {reply.messageToReplyRecipientName.slice(0, 11)}
                  {reply.messageToReplyRecipientName.length > 11 ? "..." : ""}
                </span>
                <span className="text-lg font-medium">
                  {reply.messageToReplyMessage.slice(0, 13)}
                  {reply.messageToReplyMessage.length > 13 ? "..." : ""}
                </span>
              </div>
            )}
            <p className="text-xl font-medium">{message}</p>
            <div className="flex justify-end">
              <div className="flex gap-[0.7rem]">
                {isEdited && (
                  <span className="italic text-gray-100">edited</span>
                )}
                <span className="text-gray-100">{`${new Date(
                  timeStamp
                ).getHours()}: ${
                  new Date(timeStamp).getMinutes() < 10
                    ? `0${new Date(timeStamp).getMinutes()}`
                    : new Date(timeStamp).getMinutes()
                }`}</span>
              </div>
            </div>
          </li>
          <MessageContextMenu
            x={contextMenuX}
            y={contextMenuY}
            showMenu={showContextMenu}
            setShowMenu={setShowContextMenu}
            editable={true}
            msg={msg}
            chatId={chatId}
            messageUpperPoint={messageUpperPoint}
            myUserId={myUserId}
          />
        </>
      )}
      {myUserId !== sender && (
        <>
          <li
            className="message relative bg-gray-700 justify-self-start rounded-2xl p-[0.8rem] max-w-[70%]"
            onContextMenu={handleShowContextMenu}
            ref={messageRef}
            id={msg._id}
          >
            {reply && reply.isReply && (
              <div
                className={`${styles.reply} duration-200 flex flex-col border-l-[.3rem] border-l-white pl-[0.8rem] mb-[0.4rem] cursor-pointer`}
                onClick={handleScrollToMessageYouReplied}
              >
                <span className="font-semibold text-lg">
                  {reply.messageToReplyRecipientName.slice(0, 11)}
                  {reply.messageToReplyRecipientName.length > 11 ? "..." : ""}
                </span>
                <span className="text-lg font-medium">
                  {reply.messageToReplyMessage.slice(0, 13)}
                  {reply.messageToReplyMessage.length > 13 ? "..." : ""}
                </span>
              </div>
            )}
            <p className="text-xl font-medium">{message}</p>
            <div className="flex justify-end">
              <div className="flex gap-[0.7rem]">
                {isEdited && (
                  <span className="italic text-gray-100">edited</span>
                )}
                <span className="text-gray-100">{`${new Date(
                  timeStamp
                ).getHours()}: ${
                  new Date(timeStamp).getMinutes() < 10
                    ? `0${new Date(timeStamp).getMinutes()}`
                    : new Date(timeStamp).getMinutes()
                }`}</span>
              </div>
            </div>
          </li>
          <MessageContextMenu
            myUserId={myUserId as string}
            x={contextMenuX}
            y={contextMenuY}
            showMenu={showContextMenu}
            setShowMenu={setShowContextMenu}
            editable={false}
            msg={msg}
            chatId={chatId}
            messageUpperPoint={messageUpperPoint}
          />
        </>
      )}
    </>
  );
}
