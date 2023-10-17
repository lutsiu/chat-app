import { useDispatch, useSelector } from "react-redux";
import WarningPopup from "../../components/Chat/ChatBody/Popups/WarningPopup";
import Header from "../../components/Chat/Header";
import ChatBody from "../../components/Chat/ChatBody";
import { ReduxState } from "../../interfaces/redux";
import { IMessage, UserModel } from "../../interfaces/models";
import { useEffect } from "react";
import chat, {
  setChatDataIsLoading,
  setChatId,
  setChatMessages,
  setInterlocutor,
} from "../../state/chat";
import MediaOverlay from "../../components/Chat/ChatBody/Overlays/MediaOverlay";
import { createPortal } from "react-dom";
import ContentContextMenu from "../../components/Chat/Overlays/ProfileOverlay/SharedMedia/ContentContextMenu";
import MessageContextMenu from "../../components/Chat/ChatBody/Messages/ContextMenu";
import { useSocket } from "../../context/SocketContext";
import BACKEND_SERVER from "../../utils/VARIABLES";
interface ChatData {
  chatId: string;
  chatHistory: IMessage[];
  interlocutor: UserModel;
}
export default function ChatPage() {
  const { ui } = useSelector((state: ReduxState) => state);
  const { user } = useSelector((state: ReduxState) => state.user);
  const { chatId, chatMessages } = useSelector(
    (state: ReduxState) => state.chat
  );

  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    async function fetchData() {
      try {
        const myUserName = user?.userName;
        const interlocutorUserName = location.pathname.slice(1);
        const body = JSON.stringify({ myUserName, interlocutorUserName });
        const res = await fetch(`${BACKEND_SERVER}/chat/findOrCreateChat`, {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = (await res.json()) as null | ChatData;
          if (data) {
            dispatch(setChatId(data.chatId));
            dispatch(setChatMessages(data.chatHistory));
            dispatch(setInterlocutor(data.interlocutor));
          }
        }
        dispatch(setChatDataIsLoading(false));
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [user?.userName, dispatch]);

  useEffect(() => {
    function resetData(e: any) {
      if (e.currentTarget.performance.navigation.type === 1) return;
      dispatch(setChatId(null));
      dispatch(setChatMessages([]));
      dispatch(setInterlocutor(null));
      dispatch(setChatDataIsLoading(true));
    }
    window.addEventListener("beforeunload", resetData);

    return () => {
      window.removeEventListener("beforeunload", resetData);
    };
  }, [dispatch]);

  // send status to backend
  useEffect(() => {
    socket.emit("update-status-in-chat", {
      userId: user?._id,
      isActive: true,
      chatId,
    });
  }, [socket, chatId, user?._id]);

  useEffect(() => {
    function windowClosed() {
      socket.emit("update-status-in-chat", {
        userId: user?._id,
        isActive: false,
        chatId,
      });
    }
    window.addEventListener("beforeunload", windowClosed);
  }, [chatId, socket, user?._id]);
  // set status to non active, if page is not active
  useEffect(() => {
    function checkTabVisibility() {
      if (!document.hidden) {
        // active
        socket.emit("update-status-in-chat", {
          userId: user?._id,
          isActive: true,
          chatId,
        });
      } else {
        // not active
        socket.emit("update-status-in-chat", {
          userId: user?._id,
          isActive: false,
          chatId,
        });
      }
    }
    checkTabVisibility();
    document.addEventListener("visibilitychange", checkTabVisibility);
    return () => {
      document.removeEventListener("visibilitychange", checkTabVisibility);
    };
  }, [socket, chatId, user?._id]);

  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <>
        <Header />

        <ChatBody />
      </>

      {ui.showWarningPopup && <WarningPopup />}
      {createPortal(
        <MediaOverlay />,
        document.getElementById("overlay") as HTMLElement
      )}
      {createPortal(
        <ContentContextMenu />,
        document.getElementById("overlay") as HTMLElement
      )}
      {createPortal(
        <MessageContextMenu />,
        document.getElementById("overlay") as HTMLElement
      )}
    </div>
  );
}
