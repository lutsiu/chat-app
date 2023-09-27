import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import MainHeader from "./Headers/MainHeader";
import UserInfo from "./UserInfo";
import BottomNavigationBar from "./BottomNavigationBar";
import SharedMedia from "./SharedMedia";
import { IMessage, UserModel } from "../../../../interfaces/models";
interface Props {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  user: UserModel;
  chatHistory: IMessage[];
  chatId: string;
}
export default function ProfileOverlay(props: Props) {
  const { showOverlay, setShowOverlay, user, chatHistory, chatId } = props;
  const [showMedia, setShowMedia] = useState(true);
  const [showFiles, setShowFiles] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  return (
    <motion.div
      className="md:w-[42rem] h-full overflow-y-scroll bg-slate-800 absolute top-0 right-0 z-10"
      initial={{ x: 1000 }}
      animate={{ x: showOverlay ? 0 : 1000 }}
      transition={{ duration: 0.25 }}
    >
      <div className="sticky top-0 z-20 py-[0.8rem] bg-slate-800 px-[2rem]">
        <MainHeader setShowOverlay={setShowOverlay} />
      </div>
      <UserInfo
        bio={user.bio}
        email={user.email}
        userName={user.userName}
        userImages={[user.profilePicture]}
      />
      <BottomNavigationBar
        setShowFiles={setShowFiles}
        setShowGroups={setShowGroups}
        setShowMedia={setShowMedia}
      />
      <div className="h-[0.1rem] bg-black"></div>
      <SharedMedia
        showMedia={showMedia}
        showFiles={showFiles}
        showGroups={showGroups}
        chatMessages={chatHistory}
        chatId={chatId}
      />
    </motion.div>
  );
}
