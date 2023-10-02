import { useState } from "react";
import { motion } from "framer-motion";
import ChatListItem from "../ChatListItem";
import styles from "./styles.module.scss";
import SearchList from "./SearchList";
import Header from "./Header";

export default function LeftSide() {
  
  const [showSearchList, setShowSearchList] = useState(false);

  return (
    <div className="w-full h-full flex flex-col max-h-[100vh]">
      <Header showSearchList={showSearchList} setShowSearchList={setShowSearchList}/>
      {!showSearchList && <ul
        className={`${styles.chatsList} bg-slate-800 min-h-full  flex flex-col overflow-y-scroll `}
      >
        <ChatListItem />
      </ul>}
      {showSearchList && <SearchList showSearchList={showSearchList}/>}
    </div>
  );
}
