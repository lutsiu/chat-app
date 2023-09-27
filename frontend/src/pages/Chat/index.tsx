import { useSelector } from "react-redux";
import ChatBody from "../../components/Chat/ChatBody";
import WarningPopup from "../../components/Chat/ChatBody/Popups/WarningPopup";
import Header from "../../components/Chat/Header";
import { ReduxState } from "../../interfaces/redux";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { IMessage, UserModel } from "../../interfaces/models";
import useResponsive from "../../hooks/useResponsive";
import { useState } from "react";
export default function ChatPage() {
  const { ui } = useSelector((state: ReduxState) => state);
  const width = useResponsive();
  const data = useOutletContext() as {
    chatId: string;
    chatHistory: IMessage[];
    interlocutor: UserModel;
  };
  const loaderData = useLoaderData() as {
    chatId: string;
    chatHistory: IMessage[];
    interlocutor: UserModel;
  };
  const [chatMessages, setChatMessages] = useState(data? data.chatHistory: loaderData.chatHistory);
  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <Header
        chatId={width >= 768 ? data.chatId : loaderData.chatId}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        interlocutor={width >= 768 ? data.interlocutor : loaderData.interlocutor}
      />
      <ChatBody
        chatId={width >= 768 ? data.chatId : loaderData.chatId}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      {ui.showWarningPopup && <WarningPopup />}
    </div>
  );
}
