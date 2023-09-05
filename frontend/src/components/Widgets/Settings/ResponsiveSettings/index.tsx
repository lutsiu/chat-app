import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import Header from "./Header";
import UserInfo from "./UserInfo";
import SettingsList from "./SettingsList";


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
      <div className="w-full h-[30rem] relative">
        <img
          src="https://sklepotaku.pl/userdata/public/news/images/4.jpg"
          alt="User's avatar"
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col absolute bottom-[0.6rem] left-[1rem]">
          <span className="text-xl font-medium">{"Username"}</span>
          <span className="text-gray-300">{"User status"}</span>
        </div>
      </div>
      <UserInfo email={`yasv229@gmail.com`} userName={`lutsiu`} bio={`creator of this app`}/>
      <div className="mt-[1rem]">
        <SettingsList/>
      </div>
    </motion.div>
  );
}
