import { IMessage, MediaType } from "../../../../../interfaces/models";
import { useEffect, useRef, useState } from "react";
import MessageContextMenu from "../ContextMenu";
import { BsPinAngleFill } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToMessage } from "../../../../../state/message";
import FileLoader from "./FileLoader";
import Media from "./Media";
import Reply from "./Reply";
import { ReduxState } from "../../../../../interfaces/redux";
import { setShowMessageContextMenu } from "../../../../../state/chatUI";
interface Props {
  msg: IMessage;
}

export default function Message(props: Props) {
  const { msg } = props;
  const myUserId = useSelector((state: ReduxState) => state.user.user?._id);
  const { chatId } = useSelector((state: ReduxState) => state.chat);
  const { message, timeStamp, file, media, sender, isEdited, reply, pinned } =
    msg;
  const [mediaSrcForContextMenu, setMediaSrcForContextMenu] = useState("");
  const [mediaTypeForContextMenu, setMediaTypeForContextMenu] =
    useState<MediaType>(null);
  const [messageUpperPoint, setMessageUpperPoint] = useState<
    undefined | number
  >(undefined);

  const messageRef = useRef<null | HTMLLIElement>(null);
  const dispatch = useDispatch();

  const handleShowContextMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLLIElement;
    if (target.hasAttribute("src")) {
      setMediaSrcForContextMenu(target.getAttribute("src") as string);
      setMediaTypeForContextMenu("image");
    }
    if (target.tagName === "VIDEO") {
      const sourceEl = target.getElementsByTagName("source").item(0);
      if (sourceEl) {
        const src = sourceEl.getAttribute("src");
        setMediaSrcForContextMenu(src as string);
        setMediaTypeForContextMenu("video");
      }
    }
    if (!target.closest(".message")) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    dispatch(
      setShowMessageContextMenu({
        editable: true,
        mediaSrc: mediaSrcForContextMenu,
        mediaType: mediaTypeForContextMenu,
        message: msg,
        messageUpperPoint,
        showMenu: true,
        x,
        y,
      })
    );
  };

  function handleScrollToMessageYouReplied() {
    const messageToReply = document.getElementById(
      reply?.messageToReplyId as string
    ) as HTMLElement;
    const parentEl = messageToReply?.parentElement as HTMLElement;
    const top = messageToReply?.offsetTop + parentEl.offsetTop;
    dispatch(handleScrollToMessage({ top: top as number }));
  }

  useEffect(() => {
    if (messageRef.current) {
      const messageParent = messageRef.current.parentElement as HTMLElement;
      const upperPoint = messageRef.current.offsetTop + messageParent.offsetTop;

      setMessageUpperPoint(upperPoint);
    }
  }, []);

  return (
    <>
      <li
        className={
          sender === myUserId
            ? `message ${styles.myMessage}`
            : `message ${styles.recipientMessage}`
        }
        onContextMenu={handleShowContextMenu}
        ref={messageRef}
        id={msg._id}
        style={{
          padding: media.length > 0 ? "0" : "0.8rem",
          overflow: media.length > 0 ? "hidden" : "auto",
        }}
      >
        {media.length > 0 && <Media message={msg} />}
        {file && <FileLoader file={file} message={msg} />}
        {reply && reply.isReply && (
          <Reply
            handleScrollToMessageYouReplied={handleScrollToMessageYouReplied}
            reply={reply}
          />
        )}
        <div className="flex items-end gap-[0.4rem] flex-wrap">
          {message && (
            <p
              className={`text-xl font-medium pb-[0.3rem] ${
                media.length > 0 ? styles.messageContentWithMedia : ""
              } ${
                media.length > 0 && isEdited
                  ? styles.messageContentPaddingRightBig
                  : ""
              }`}
            >
              {message}
            </p>
          )}
          <div
            className={`flex justify-end flex-1
               ${media.length > 0 ? styles.messageInfoAbsolute : ""}
                ${
                  media.length > 0 && message
                    ? styles.messageInfoAbsoluteWithMessage
                    : ""
                }
              `}
          >
            <div className="flex gap-[0.7rem] items-center">
              {pinned && <BsPinAngleFill />}
              {isEdited && <span className="italic text-gray-100">edited</span>}
              <span className="text-gray-100">{`${new Date(
                timeStamp
              ).getHours()}: ${
                new Date(timeStamp).getMinutes() < 10
                  ? `0${new Date(timeStamp).getMinutes()}`
                  : new Date(timeStamp).getMinutes()
              }`}</span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
