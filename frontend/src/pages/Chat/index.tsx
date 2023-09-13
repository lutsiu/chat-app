import { useSelector } from "react-redux";
import ChatBody from "../../components/Chat/ChatBody";
import WarningPopup from "../../components/Chat/ChatBody/Popups/WarningPopup"
import Header from "../../components/Chat/Header";
import { ReduxState } from "../../interfaces/redux";
export default function ChatPage() {
  const {ui} = useSelector((state: ReduxState) => state);
  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <Header/>
      <ChatBody/>
      {ui.showWarningPopup && <WarningPopup/>}
    </div>
  );
}
