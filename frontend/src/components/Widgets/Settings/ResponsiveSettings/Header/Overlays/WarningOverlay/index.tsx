import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../../../../../state/user";
interface Props {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
}

export default function WarningOverlay(props: Props) {
  const { setShowOverlay, showOverlay } = props;
  const [activeCancelButton, setActiveCancelButton] = useState(false);
  const [activeLogoutButton, setActiveLogoutButton] = useState(false);
  const dispatch = useDispatch();
  return (
    <motion.div
      animate={{
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
      }}
      className="warning-overlay fixed z-30 w-full h-full top-0 right-0 bottom-0 left-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("warning-overlay")) {
          setShowOverlay(false);
        } else {
          return;
        }
      }}
    >
      <motion.div className="w-[90%] bg-gray-700 pl-[1rem] pt-[1rem] pr-[2rem] pb-[1.5rem] rounded-xl flex flex-col gap-[1rem]">
        <h4 className="text-2xl font-medium">Telegram</h4>
        <p className="text-lg font-normal">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-[2.5rem]">
          <button
            className="p-[0.5rem] duration-200 rounded-lg text-lg font-semibold text-violet-500"
            onTouchStart={() => setActiveCancelButton(true)}
            onTouchEnd={() => setActiveCancelButton(false)}
            style={{
              backgroundColor: activeCancelButton
                ? "rgba(147, 51, 234, .4)"
                : "",
            }}
            onClick={() => setShowOverlay(false)}
          >
            CANCEL
          </button>
          <button
            className="p-[0.5rem] duration-200 rounded-lg text-lg font-semibold text-pink-600"
            onTouchStart={() => setActiveLogoutButton(true)}
            onTouchEnd={() => setActiveLogoutButton(false)}
            style={{
              backgroundColor: activeLogoutButton
                ? "rgba(219, 39, 119, .2)"
                : "",
            }}
            onClick={() => dispatch(setLogout())}
          >
            LOG OUT
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
