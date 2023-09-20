import { motion } from "framer-motion";
import { PiBellSlashLight, PiShareFat } from "react-icons/pi";
import { HiMiniGift, HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidLockAlt } from "react-icons/bi";
import { BsUnlockFill } from "react-icons/bs";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useState } from "react";
import useResponsive from "../../../../hooks/useResponsive";
interface Props {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  setShowSearch: (show: boolean) => void;
}

export default function MenuOverlay(props: Props) {
  const { showOverlay, setShowOverlay, setShowSearch } = props;
  const [deleteIsActive, setDeleteIsActive] = useState(false);
  const width = useResponsive();
  return (
    <motion.div
      className="menu-overlay fixed  w-full h-full top-0 right-0 bottom-0 left-0 z-[20]"
      animate={{
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("menu-overlay")) {
          setShowOverlay(false);
        }
      }}
    >
      <motion.div
        className="absolute bg-slate-800 right-[3rem] top-[6rem] rounded-xl origin-top-right"
        animate={{
          transform: showOverlay ? "scale(100%)" : "scale(0)",
          opacity: showOverlay ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        {width < 768 && (
          <div
            className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] rounded-lg hover:bg-gray-700 duration-200 cursor-pointer"
            onClick={() => {
              setShowSearch(true);
              setShowOverlay(false);
            }}
          >
            <HiMagnifyingGlass className="text-3xl" />
            <span className="font-bold text-xl">Search</span>
          </div>
        )}
        <div className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] rounded-lg hover:bg-gray-700 duration-200 cursor-pointer">
          <PiBellSlashLight className="text-3xl" />
          <span className="font-bold text-xl">Mute</span>
        </div>
        <div className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] rounded-lg hover:bg-gray-700 duration-200 cursor-pointer">
          <IoIosCheckmarkCircleOutline className="text-3xl" />
          <span className="font-bold text-xl">Select Messages</span>
        </div>
        <div className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] rounded-lg hover:bg-gray-700 duration-200 cursor-pointer">
          <PiShareFat className="text-3xl" />
          <span className="font-bold text-xl">Share Contact</span>
        </div>
        <div className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] rounded-lg hover:bg-gray-700 duration-200 cursor-pointer">
          <HiMiniGift className="text-3xl" />
          <span className="font-bold text-xl">Gift Premium</span>
        </div>
        <div className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] rounded-lg hover:bg-gray-700 duration-200 cursor-pointer">
          <BiSolidLockAlt className="text-3xl" />
          <span className="font-bold text-xl">Block user</span>
        </div>
        <div
          className="py-[0.6rem] px-[1rem] flex items-center gap-[1rem] text-red-600 rounded-lg  cursor-pointer"
          onMouseEnter={() => setDeleteIsActive(true)}
          onMouseLeave={() => setDeleteIsActive(false)}
          onTouchStart={() => setDeleteIsActive(true)}
          onTouchEnd={() => setDeleteIsActive(false)}
          style={{
            backgroundColor: deleteIsActive ? "rgba(220, 38, 38, 0.3)" : "",
          }}
        >
          <RiDeleteBin7Fill className="text-3xl" />
          <span className="font-bold text-xl">Delete Chat</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
