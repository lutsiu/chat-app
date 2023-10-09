import Chat from "./Chat";
import { FoundChat } from "..";
interface Props {
  chats: FoundChat[]
}
export default function FoundChats(props :Props) {
  const {chats} = props;
  return (
    <div className="flex flex-col gap-[2.5rem] mt-[2.5rem] pl-[1rem] max-h-[90vh] overflow-y-scroll">
      <h4 className="text-2xl font-semibold text-gray-300">Chats</h4>
      <ul className="flex flex-col  h-full ">
        {chats.map((chat, i) => {
          const {profilePicture, userName, name} = chat.interlocutor;
          return <Chat key={i} profileImage={profilePicture} userName={userName} fullName={name} />
        })}
        {chats.length ===0 && <p className="text-xl">We didn't find any chats</p>}
      </ul>
    </div>
  )
}