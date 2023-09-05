import { motion } from "framer-motion";
import { IoLogOutOutline } from "react-icons/io5";
interface Props {
  showLogout: boolean;
  setShowLogout: (show: boolean) => void;
  setShowWarningPopup: (show: boolean) => void;
}
export default function LogoutOverlay(props: Props) {
  const { showLogout, setShowLogout, setShowWarningPopup } = props;
  return (
    <motion.div
      className="fixed z-[30] bg-transparent w-full h-full top-0 right-0  bottom-0 left-0"
      onClick={() => setShowLogout(false)}
      animate={{
        opacity: showLogout ? 1 : 0,
        pointerEvents: showLogout ? "auto" : "none",
      }}
    >
      <motion.div
        initial={{ transform: "scale(0)" }}
        animate={{
          transform: showLogout ? "scale(100%)" : "scale(0)",
          opacity: showLogout ? 1 : 0,
        }}
        transition={{ duration: 0.15, damping: 10 }}
        className="bg-slate-800 absolute right-[1.9rem] top-[4.5rem] origin-top-right flex items-center w-[20rem] rounded-2xl gap-[2rem] py-[1.5rem] px-[1rem]"
        onClick={() => {
          setShowLogout(false);
          setShowWarningPopup(true);
        }}
      >
        <div>
          <IoLogOutOutline className="text-4xl" />
        </div>
        <span className="text-xl font-medium">Log Out</span>
      </motion.div>
    </motion.div>
  );
}
