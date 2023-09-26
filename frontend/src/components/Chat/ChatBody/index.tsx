import { useState, useEffect } from "react";
import useResponsive from "../../../hooks/useResponsive";
import SendFile from "./Overlays/SendFile";
import SendMedia from "./Overlays/SendMedia";
import { useSocket } from "../../../context/SocketContext";
import MessageBar from "./MessageBar";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { IMessage } from "../../../interfaces/models";
import Messages from "./Messages";
import { MessageType } from "../../../interfaces/message";
import PinnedMessages from "./PinnedMessages";
import FoundMessagesBottomBar from "./FoundMessagesBottomBar";
interface Props {
  chatId: string;
  chatHistory: IMessage[];
}

export default function ChatBody(props: Props) {
  const { chatId, chatHistory } = props;
  const [showFilesPopup, setShowFilesPopup] = useState(false);
  const [showFileOverlay, setShowFileOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const [chatMessages, setChatMessages] = useState(chatHistory);
  const [media, setMedia] = useState<null | Blob[]>(null);
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<null | File>(null);

  const { user } = useSelector((state: ReduxState) => state.user);
  const { showSearchBar } = useSelector((state: ReduxState) => state.ui);
  const width = useResponsive();

  const socket = useSocket();

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
          const { messageToReplyId, senderId } = action.reply;
          socket.emit("reply-to-message", {
            message: inputValue,
            messageToReplyId,
            senderId,
            chatId,
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
      setChatMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("send-message");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("send-message-with-file", (message: IMessage) => {
      setChatMessages((prev) => [...prev, message]);
    });
  }, [socket]);
  // update messages if one of them was deleted
  useEffect(() => {
    socket.on("delete-message", (messageId: string) => {
      setChatMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    });
    return () => {
      socket.off("delete-message");
    };
  }, [socket]);

  // update messages if one of them was edited
  useEffect(() => {
    socket.on(
      "edit-message",
      (data: { messageId: string; message: string }) => {
        const { message, messageId } = data;

        setChatMessages((prev) => {
          return prev.map((msg) => {
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
        });
      }
    );
  }, [socket]);

  // update message if media was deleted
  useEffect(() => {
    socket.on(
      "delete-media",
      (data: { messageId: string; message: IMessage }) => {
        const { message, messageId } = data;
        setChatMessages((prev) => {
          return prev.map((msg) => {
            if (msg._id !== messageId) {
              return msg;
            } else {
              console.log(message.media);
              return { ...msg, media: message.media };
            }
          });
        });
      }
    );
  }, [socket]);
  // update messages if one of them was pinned/unpinned
  useEffect(() => {
    socket.on("pin-or-unpin-message", (messageId: string) => {
      setChatMessages((prev) => {
        return prev.map((msg) => {
          if (msg._id !== messageId) {
            return msg;
          } else {
            return {
              ...msg,
              pinned: !msg.pinned,
            };
          }
        });
      });
    });
  }, [socket]);
  // fetch replies
  useEffect(() => {
    socket.on("reply-to-message", (reply: IMessage) => {
      setChatMessages((prev) => [...prev, reply]);
    });
  }, [socket]);

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
  useEffect(() => {
    socket.on("send-message-with-media", (message: IMessage) => {
      console.log(message);
      setChatMessages((prev) => [...prev, message]);
    });
  }, [socket]);
  return (
    <>
      <div className="flex-1 w-full overflow-y-hidden relative">
        {chatMessages.filter((msg) => msg.pinned).length > 0 && (
          <PinnedMessages
            pinnedMessages={chatMessages.filter((msg) => msg.pinned)}
          />
        )}
        <Messages
          messages={chatMessages}
          chatId={chatId}
          myUserId={user?._id}
        />
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
        {(showSearchBar && width < 768) && <FoundMessagesBottomBar chatId={chatId}/>}
      </div>
      <SendFile
        showOverlay={showFileOverlay}
        setFile={setFile}
        file={file}
        chatId={chatId}
        userId={user?._id as string}
      />
      <SendMedia
        showOverlay={showMediaOverlay}
        media={media}
        setMedia={setMedia}
        chatId={chatId}
        userId={user?._id as string}
      />
    </>
  );
}
