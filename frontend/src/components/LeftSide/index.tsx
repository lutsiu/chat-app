import { IoMenuSharp } from "react-icons/io5";
import SearchBar from "../Widgets/SearchBars/MainSearchBar";
import ChatListItem from "../ChatListItem";
import styles from "./styles.module.scss";
import { setShowLeftMenu, setShowOverlay } from "../../state/ui";
import { useDispatch } from "react-redux";
export default function LeftSide() {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full flex flex-col max-h-[100vh]">
      <div className="flex bg-slate-800 px-[1.2rem] w-full items-center gap-[1rem] py-[0.8rem]">
        <div
          className="p-[0.6rem] rounded-full duration-200 active:bg-slate-700"
          onClick={() => {
            dispatch(setShowOverlay())
            dispatch(setShowLeftMenu());
          }}
        >
          <IoMenuSharp className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer" />
        </div>
        <SearchBar />
      </div>
      <ul
        className={`${styles.chatsList} bg-slate-800 flex-1 flex flex-col overflow-y-scroll `}
      >
        <ChatListItem />
      </ul>
    </div>
  );
}
