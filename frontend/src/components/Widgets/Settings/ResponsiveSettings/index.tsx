import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import Header from "./Header";
import UserInfo from "./UserInfo";
import SettingsList from "./SettingsList";
import UserPhotos from "../../UserPhotos";
import { useEffect, useState } from "react";


export default function ResponsiveSettings() {
  const dispatch = useDispatch();
  const { ui } = useSelector((state: ReduxState) => state);
  const {user} = useSelector((state: ReduxState) => state.user);
  return (
    <motion.div
      className="fixed top-0 bottom-0 w-full h-full bg-black rounded-xl overflow-y-scroll z-[30]"
      initial={{ opacity: 0, x: 50, pointerEvents: "none" }}
      animate={{
        opacity: ui.showSettings ? 1 : 0,
        x: ui.showSettings ? 0 : 50,
        pointerEvents: ui.showSettings ? "auto" : "none",
      }}
      transition={{ease: 'easeOut'}}
    >
      <Header />
      <UserPhotos photos={user?.profilePictures as string[]} userName={user?.userName as string}/>
      <UserInfo email={user?.email as string} userName={user?.userName as string} bio={user?.bio as string}/>
      <div className="mt-[1rem]">
        <SettingsList/>
      </div>
    </motion.div>
  );
}
