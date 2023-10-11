import { motion } from "framer-motion";
import { useState } from "react";
import MainHeader from "./Headers/MainHeader";
import UserInfo from "./UserInfo";
import BottomNavigationBar from "./BottomNavigationBar";
import SharedMedia from "./SharedMedia";
import { IMessage, UserModel } from "../../../../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
interface Props {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
}
export default function ProfileOverlay(props: Props) {
  const {interlocutor} = useSelector((state: ReduxState) => state.chat);
  const {user} = useSelector((state: ReduxState) => state.user)
  const { showOverlay, setShowOverlay} = props;
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
        bio={interlocutor?.bio}
        email={interlocutor?.email}
        userName={interlocutor?.userName}
        userImages={interlocutor?.profilePictures}
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
      />
    </motion.div>
  );
}
