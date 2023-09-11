import ChatBody from "../../components/Chat/ChatBody";
import Header from "../../components/Chat/Header";

export default function ChatPage() {
  return (
    <div className="bg-gray-900 min-h-screen max-h-screen relative flex flex-col">
      <Header/>
      <ChatBody/>
    </div>
  );
}
