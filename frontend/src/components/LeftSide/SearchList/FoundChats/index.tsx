import Chat from "./Chat";
import { Interlocutor } from "..";
interface Props {
  chats: Interlocutor[]
}
export default function FoundChats(props :Props) {
  const {chats} = props;
  return (
    <div className="flex flex-col  mt-[2.5rem] pl-[1rem] max-h-[90vh] overflow-y-scroll">
      <h4 className="text-2xl font-semibold text-gray-300 mb-[1rem]">Chats</h4>
      <ul className="flex flex-col  h-full gap-[1rem]">
        {chats.map((chat, i) => {
          const {profilePicture, userName, name} = chat;
          return <Chat key={i} profileImage={profilePicture} userName={userName} fullName={name} />
        })}
        {chats.length ===0 && <p className="text-xl">We didn't find any chats</p>}
      </ul>
    </div>
  )
}