import { useState, useEffect } from "react";
import useResponsive from "../../../hooks/useResponsive";
import SendFile from "./Overlays/SendFile";
import SendMedia from "./Overlays/SendMedia";
import { useSocket } from "../../../context/SocketContext";
import MessageBar from "./MessageBar";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { IMessage } from "../../../interfaces/models";
import Messages from "./Messages";
import { MessageType } from "../../../interfaces/message";
import PinnedMessages from "./PinnedMessages";
import FoundMessagesBottomBar from "./FoundMessagesBottomBar";
import { setChatMessages } from "../../../state/chat";

export default function ChatBody() {
  const { chatId, chatMessages } = useSelector(
    (state: ReduxState) => state.chat
  );
  const [showFilesPopup, setShowFilesPopup] = useState(false);
  const [showFileOverlay, setShowFileOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const [media, setMedia] = useState<null | Blob[]>(null);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<null | File>(null);

  const { user } = useSelector((state: ReduxState) => state.user);
  const { showSearchBar } = useSelector((state: ReduxState) => state.ui);

  const dispatch = useDispatch();
  const width = useResponsive();
  const socket = useSocket();
  const pinnedMessages = chatMessages.filter((msg) => msg.pinned).length > 0;
  async function sendMessage(
    action: MessageType,
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    try {
      if (inputValue.trim() !== "") {
        if (action.sendMessage) {
          socket.emit("send-message", {
            content: inputValue,
            userId: user?._id,
            chatId,
          });
        }
        if (action.editMessage) {
          const { messageId } = action.editMessage;
          socket.emit("edit-message", {
            messageId,
            chatId,
            message: inputValue,
          });
        }
        if (action.reply) {
          const { messageToReplyId, senderId, mediaPath, mediaType } =
            action.reply;
          socket.emit("reply-to-message", {
            message: inputValue,
            messageToReplyId,
            senderId,
            chatId,
            mediaPath,
            mediaType,
          });
        }
        setInputValue("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // fetch sended message
  useEffect(() => {
    socket.on("send-message", (message: IMessage) => {
      dispatch(setChatMessages([...chatMessages, message]));
    });
    return () => {
      socket.off("send-message");
    };
  }, [socket, dispatch, chatMessages]);

  useEffect(() => {
    socket.on("send-message-with-file", (message: IMessage) => {
      dispatch(setChatMessages([...chatMessages, message]));
    });
  }, [socket, dispatch, chatMessages]);
  // update messages if one of them was deleted
  useEffect(() => {
    socket.on("delete-message", (messageId: string) => {
      const updatedMessages = chatMessages.filter(
        (msg) => msg._id !== messageId
      );
      dispatch(setChatMessages(updatedMessages));
    });
    return () => {
      socket.off("delete-message");
    };
  }, [socket, chatMessages, dispatch]);

  // update messages if one of them was edited
  useEffect(() => {
    socket.on(
      "edit-message",
      (data: { messageId: string; message: string }) => {
        const { message, messageId } = data;
        const updatedMessages = chatMessages.map((msg) => {
          if (msg._id !== messageId) {
            return msg;
          } else {
            // Create a new message object with the updated content
            return {
              ...msg,
              message: message,
              isEdited: true,
            };
          }
        });
        dispatch(setChatMessages(updatedMessages));
      }
    );
  }, [chatMessages, dispatch, socket]);

  // update message if media was deleted
  useEffect(() => {
    socket.on(
      "delete-media",
      (data: { messageId: string; message: IMessage }) => {
        const { message, messageId } = data;
        const updatedMessages = chatMessages.map((msg) => {
          if (msg._id !== messageId) {
            return msg;
          } else {
            console.log(message.media);
            return { ...msg, media: message.media };
          }
        });
        dispatch(setChatMessages(updatedMessages));
      }
    );
  }, [chatMessages, dispatch, socket]);
  // update messages if one of them was pinned/unpinned
  useEffect(() => {
    socket.on("pin-or-unpin-message", (messageId: string) => {
      const updatedMessages = chatMessages.map((msg) => {
        if (msg._id !== messageId) {
          return msg;
        } else {
          return {
            ...msg,
            pinned: !msg.pinned,
          };
        }
      });
      dispatch(setChatMessages(updatedMessages));
    });
  }, [socket, chatMessages, dispatch]);
  // fetch replies
  useEffect(() => {
    socket.on("reply-to-message", (reply: IMessage) => {
      dispatch(setChatMessages([...chatMessages, reply]));
    });
  }, [socket, dispatch, chatMessages]);

  useEffect(() => {
    socket.on("send-message-with-media", (message: IMessage) => {
      dispatch(setChatMessages([...chatMessages, message]));
    });
  }, [socket, dispatch, chatMessages]);
  // provide socket with id of group in order to create group
  useEffect(() => {
    socket.emit("joinRoom", chatId);
  }, [chatId, socket]);

  // show one of overlays
  useEffect(() => {
    if (file) {
      setShowFileOverlay(true);
    } else {
      setShowFileOverlay(false);
    }
    if (media) {
      setShowMediaOverlay(true);
    } else {
      setShowMediaOverlay(false);
    }
  }, [file, media]);
  // close overlay
  useEffect(() => {
    function handleCloseSendFiles(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        !target.classList.contains("file-popup") &&
        !target.classList.contains("open-files-popup")
      ) {
        setShowFilesPopup(false);
      }
    }
    document.addEventListener("click", handleCloseSendFiles);
    return () => {
      document.removeEventListener("click", handleCloseSendFiles);
    };
  }, []);

  return (
    <>
      <div className="flex-1 w-full overflow-y-hidden relative">
        {pinnedMessages && (
          <PinnedMessages
            pinnedMessages={chatMessages.filter((msg) => msg.pinned)}
          />
        )}
        <Messages />
        {!(showSearchBar && width < 768) && (
          <MessageBar
            sendMessage={sendMessage}
            setInputValue={setInputValue}
            inputValue={inputValue}
            setShowFilesPopup={setShowFilesPopup}
            setFile={setFile}
            setMedia={setMedia}
            showFilesPopup={showFilesPopup}
          />
        )}
        {showSearchBar && width < 768 && <FoundMessagesBottomBar />}
      </div>
      <SendFile showOverlay={showFileOverlay} setFile={setFile} file={file} />
      <SendMedia
        showOverlay={showMediaOverlay}
        media={media}
        setMedia={setMedia}
      />
    </>
  );
}
