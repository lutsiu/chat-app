import { motion } from "framer-motion";
import { AiOutlineSetting } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineUserCircle, HiSpeakerphone } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import Overlay from "../Overlay";
import {
  hideEverything,
  setShowContacts,
  setShowCreateGroupStep1,
  setShowLeftMenu,
  setShowOverlay,
  setShowSettings,
} from "../../../state/ui";
export default function DesktopMenu() {
  const { ui } = useSelector((state: ReduxState) => state);
  const dispatch = useDispatch();
  return (
    <Overlay>
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: ui.showLeftMenu ? 0 : -1000 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[20%] bg-slate-900 h-full flex flex-col gap-[0.07rem]"
      >
        <div className="h-[15%] bg-slate-800 pt-[2rem] pl-[1.7rem]">
          <div className="w-[4.5rem] h-[4.5rem]">
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Ed3n9AgfvH7vN99xUGOCrwqSgLNq-dLDAg&usqp=CAU"
              }
              className="w-full h-full rounded-full object-cover"
              alt="User avatar"
            />
            <p className="mt-[1rem] text-xl font-normal">{"Fullname"}</p>
          </div>
        </div>
        <ul className="h-[85%] bg-slate-800 pt-[0.4rem]">
          <li
            className="w-full flex items-center gap-[1.3rem] text-zinc-200 hover:bg-slate-700 py-[0.8rem] pl-[1.7rem] cursor-pointer"
            onClick={() => {
              dispatch(setShowLeftMenu());
              dispatch(setShowCreateGroupStep1());
            }}
          >
            <PiUsers className="w-[2.2rem] h-[2.2rem]" />
            <p className="text-xl font-normal">New Group</p>
          </li>
          <li className="w-full flex items-center gap-[1.3rem] text-zinc-200 hover:bg-slate-700 py-[0.8rem] pl-[1.7rem] cursor-pointer">
            <HiSpeakerphone className="w-[2.2rem] h-[2.2rem]" />
            <p className="text-xl font-normal">New Channel</p>
          </li>
          <li
            onClick={() => {
              dispatch(setShowLeftMenu());
              dispatch(setShowContacts());
            }}
            className="w-full flex items-center gap-[1.3rem] text-zinc-200 hover:bg-slate-700 py-[0.8rem] pl-[1.7rem] cursor-pointer"
          >
            <HiOutlineUserCircle className="w-[2.2rem] h-[2.2rem]" />
            <p className="text-xl font-normal">Contacts</p>
          </li>
          <li className="w-full flex items-center gap-[1.3rem] text-zinc-200 hover:bg-slate-700 py-[0.8rem] pl-[1.7rem] cursor-pointer">
            <IoCallOutline className="w-[2.2rem] h-[2.2rem]" />
            <p className="text-xl font-normal">Calls</p>
          </li>
          <li className="w-full flex items-center gap-[1.3rem] text-zinc-200 hover:bg-slate-700 py-[0.8rem] pl-[1.7rem] cursor-pointer">
            <BsBookmark className="w-[2.2rem] h-[2.2rem]" />
            <p className="text-xl font-normal">Saved messages</p>
          </li>
          <li
            onClick={() => {
              dispatch(setShowLeftMenu());
              dispatch(setShowSettings());
            }}
            className="w-full flex items-center gap-[1.3rem] text-zinc-200 hover:bg-slate-700 py-[0.8rem] pl-[1.7rem] cursor-pointer"
          >
            <AiOutlineSetting className="w-[2.2rem] h-[2.2rem]" />
            <p className="text-xl font-normal">Settings</p>
          </li>
        </ul>
      </motion.div>
    </Overlay>
  );
}