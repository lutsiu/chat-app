import { PiFilePlusLight } from "react-icons/pi";
import { BsFillPinFill, BsBellSlash } from "react-icons/bs";
import { BiArchiveIn } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useResponsive from "../../../hooks/useResponsive";
interface Props {
  showContextMenu: boolean;
  setShowContextMenu: (show: boolean) => void;
  contextMenuLeft: number;
  contextMenuTop: number;
}
export default function ContextMenu(props: Props) {
  const {
    showContextMenu,
    setShowContextMenu,
    contextMenuLeft,
    contextMenuTop,
  } = props;
  const [deleteIsActive, setDeleteIsActive] = useState(false);
  const [showMenuBeforeCursor, setShowMenuBeforeCursor] = useState(true);
  const width = useResponsive();

  useEffect(() => {
    if (width < 768 && contextMenuLeft > width / 2) {
      setShowMenuBeforeCursor(false);
    }
    if (width < 768 && contextMenuLeft < width / 2) {
      setShowMenuBeforeCursor(true);
    }
  }, [width, contextMenuLeft]);

  return (
    <motion.div
      className="context-menu-overlay fixed z-[30] w-full h-full top-0 right-0 bottom-0 left-0 "
      animate={{
        opacity: showContextMenu ? 1 : 0,
        pointerEvents: showContextMenu ? "auto" : "none",
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("context-menu-overlay")) {
          setShowContextMenu(false);
        } else {
          return;
        }
      }}
    >
      <motion.div
        className="flex flex-col origin-top-left absolute bg-slate-800 p-[0.5rem] rounded-xl w-[16.5rem]"
        style={{
          top: contextMenuTop,
          left: showMenuBeforeCursor ? contextMenuLeft : contextMenuLeft - 160,
        }}
        animate={{
          transform: showContextMenu ? "scale(100%)" : "scale(0)",
          opacity: showContextMenu ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex gap-[1rem] items-center pr-[1rem] py-[0.4rem] hover:bg-slate-700 duration-200 cursor-pointer rounded-lg px-[0.5rem]">
          <PiFilePlusLight className="min-h-[2rem] min-w-[2rem]" />
          <span className="font-semibold text-xl">Open in new tab</span>
        </div>
        <div className="flex gap-[1rem] items-center pr-[1rem] py-[0.4rem] hover:bg-slate-700 duration-200 cursor-pointer rounded-lg px-[0.5rem]">
          <BsFillPinFill className="min-h-[2rem] min-w-[2rem]" />
          <span className="font-semibold text-xl">Pin</span>
        </div>
        <div className="flex gap-[1rem] items-center pr-[1rem] py-[0.4rem] hover:bg-slate-700 duration-200 cursor-pointer rounded-lg px-[0.5rem]">
          <BsBellSlash className="min-h-[2rem] min-w-[2rem]" />
          <span className="font-semibold text-xl">Mute</span>
        </div>
        <div className="flex gap-[1rem] items-center pr-[1rem] py-[0.4rem] hover:bg-slate-700 duration-200 cursor-pointer rounded-lg px-[0.5rem]">
          <BiArchiveIn className="min-h-[2rem] min-w-[2rem]" />
          <span className="font-semibold text-xl">Archive</span>
        </div>
        <div
          onMouseEnter={() => setDeleteIsActive(true)}
          onMouseLeave={() => setDeleteIsActive(false)}
          onTouchStart={() => setDeleteIsActive(true)}
          onTouchEnd={() => setDeleteIsActive(false)}
          className="flex gap-[1rem] items-center pr-[1rem] py-[0.4rem] text-red-600 cursor-pointer rounded-lg px-[0.5rem]"
          style={{
            backgroundColor: deleteIsActive ? "rgba(220, 38, 38,0.3)" : "",
          }}
        >
          <AiTwotoneDelete className="min-h-[2rem] min-w-[2rem]" />
          <span className="font-semibold text-xl">Delete</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
