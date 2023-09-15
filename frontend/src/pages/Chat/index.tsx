import { useSelector } from "react-redux";
import ChatBody from "../../components/Chat/ChatBody";
import WarningPopup from "../../components/Chat/ChatBody/Popups/WarningPopup"
import Header from "../../components/Chat/Header";
import { ReduxState } from "../../interfaces/redux";
import { useOutletContext } from "react-router-dom";
import { IMessage } from "../../interfaces/models";
export default function ChatPage() {
  const {ui} = useSelector((state: ReduxState) => state);
  const data = useOutletContext() as {chatId: string, chatHistory: IMessage[]};

  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <Header/>
      <ChatBody chatId={data.chatId} chatHistory={data.chatHistory}/>
      {ui.showWarningPopup && <WarningPopup/>}
    </div>
  );
}
