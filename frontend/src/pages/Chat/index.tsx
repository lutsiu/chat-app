import { useSelector } from "react-redux";
import ChatBody from "../../components/Chat/ChatBody";
import WarningPopup from "../../components/Chat/ChatBody/Popups/WarningPopup";
import Header from "../../components/Chat/Header";
import { ReduxState } from "../../interfaces/redux";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { IMessage } from "../../interfaces/models";
import useResponsive from "../../hooks/useResponsive";
export default function ChatPage() {
  const { ui } = useSelector((state: ReduxState) => state);
  const width = useResponsive();
  const data = useOutletContext() as {
    chatId: string;
    chatHistory: IMessage[];
  };
  const loaderData = useLoaderData() as {
    chatId: string;
    chatHistory: IMessage[];
  };
  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <Header chatId={width >= 768 ? data.chatId : loaderData.chatId} />
      <ChatBody
        chatId={width >= 768 ? data.chatId : loaderData.chatId}
        chatHistory={width >=768 ? data.chatHistory : loaderData.chatHistory}
      />
      {ui.showWarningPopup && <WarningPopup />}
    </div>
  );
}
