import { IoMenuSharp } from "react-icons/io5";
import SearchBar from "../Widgets/SearchBar";
import ChatListItem from "../ChatListItem";
import styles from './styles.module.scss';
export default function LeftSide() {
  return (
    <div className="w-full h-full flex flex-col max-h-[100vh]">
      <div className="flex bg-slate-800 px-[1.2rem] w-full items-center gap-[1rem] py-[0.8rem]">
        <div className="p-[0.6rem] rounded-full duration-200 active:bg-slate-700">
          <IoMenuSharp className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer " />
        </div>
        <SearchBar />
      </div>
      <ul className={`${styles.chatsList} bg-slate-800 flex-1 flex flex-col overflow-y-scroll `}>
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        <ChatListItem/>
        <ChatListItem/>
      
        
      </ul>
    </div>
  );
}