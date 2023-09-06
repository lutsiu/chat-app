import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import Header from "./Header";
import UserInfo from "./UserInfo";
import SettingsList from "./SettingsList";
import UserPhotos from "../../UserPhotos";


export default function ResponsiveSettings() {
  const dispatch = useDispatch();
  const { ui } = useSelector((state: ReduxState) => state);

  return (
    <motion.div
      className="fixed top-0 bottom-0 w-full h-full bg-black rounded-xl overflow-y-scroll"
      initial={{ opacity: 0, x: 50, pointerEvents: "none" }}
      animate={{
        opacity: ui.showSettings ? 1 : 0,
        x: ui.showSettings ? 0 : 50,
        pointerEvents: ui.showSettings ? "auto" : "none",
      }}
      transition={{ease: 'easeOut'}}
    >
      <Header />
      <UserPhotos/>
      <UserInfo email={`yasv229@gmail.com`} userName={`lutsiu`} bio={`creator of this app`}/>
      <div className="mt-[1rem]">
        <SettingsList/>
      </div>
    </motion.div>
  );
}
