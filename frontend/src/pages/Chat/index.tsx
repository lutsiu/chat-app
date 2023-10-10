import { useDispatch, useSelector } from "react-redux";
import WarningPopup from "../../components/Chat/ChatBody/Popups/WarningPopup";
import Header from "../../components/Chat/Header";
import { ReduxState } from "../../interfaces/redux";
import { IMessage, UserModel } from "../../interfaces/models";
import { useEffect } from "react";
import {
  setChatDataIsLoading,
  setChatId,
  setChatMessages,
  setInterlocutor,
} from "../../state/chat";
import MediaOverlay from "../../components/Chat/ChatBody/Overlays/MediaOverlay";
import { createPortal } from "react-dom";
interface ChatData {
  chatId: string;
  chatHistory: IMessage[];
  interlocutor: UserModel;
}
export default function ChatPage() {
  const { ui } = useSelector((state: ReduxState) => state);
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const myUserName = user?.userName;
        const interlocutorUserName = location.pathname.slice(1);
        const body = JSON.stringify({ myUserName, interlocutorUserName });
        const res = await fetch("http://localhost:3000/chat/findOrCreateChat", {
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
      if (e.currentTarget.performance.navigation.type === 1) return
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
  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <>
        <Header />

        {/* <ChatBody
          chatId={width >= 768 ? data.chatId : loaderData.chatId}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        /> */}
      </>

      {ui.showWarningPopup && <WarningPopup />}
      {createPortal(
        <MediaOverlay

        />,
        document.getElementById("overlay") as HTMLElement
      )}
    </div>
  );
}
