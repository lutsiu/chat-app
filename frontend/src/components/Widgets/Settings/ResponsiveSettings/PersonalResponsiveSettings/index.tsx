
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import Header from "./Header";
import UserData from "./UserData";
export default function PersonalResponsiveSettings() {
  const { ui } = useSelector((state: ReduxState) => state);

  return (
    <motion.div
    className="fixed top-0 bottom-0 w-full h-full bg-gray-800 rounded-xl overflow-y-scroll"
    initial={{opacity: 0, x: 50, pointerEvents: 'none'}}
      animate={{
        opacity: ui.showMyAccountSettings ? 1 : 0,
        x: ui.showMyAccountSettings ? 0 : 50,
        pointerEvents: ui.showMyAccountSettings ? "auto" : "none",
      }}
      transition={{ ease: "easeOut" }}
    >
      <Header/>
      <UserData/>
    </motion.div>
  );
}
