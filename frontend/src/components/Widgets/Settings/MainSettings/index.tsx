import {  motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import UserInfo from "./UserInfo";
import SettingsList from "./SettingsList";
export default function MainSettings() {
  const { showSettings } = useSelector((state: ReduxState) => state.ui);

  return (
    <motion.div
      className="absolute top-[5%] md:left-[30%] lg:left-[35%] 2xl:left-[40%] bg-gray-800 rounded-3xl overflow-x-hidden flex flex-col gap-[1rem] z-[50]"
      initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
      animate={{
        opacity: showSettings ? 1 : 0,
        x: showSettings ? 0 : 100,
        pointerEvents: showSettings ? "auto" : "none",
      }}
    >
      <UserInfo />
      <SettingsList />
    </motion.div>
  );
}
