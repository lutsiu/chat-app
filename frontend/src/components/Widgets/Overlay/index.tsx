import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { hideEverything } from "../../../state/ui";
interface Props {
  children: React.ReactNode;
}

export default function Overlay(props: Props) {
  const dispatch = useDispatch();

  const { ui } = useSelector((state: ReduxState) => state);
  return (
    <motion.div
      className="left-menu-overlay absolute w-full h-full top-0 right-0 bottom-0 left-0 z-[20]"
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        pointerEvents: ui.showOverlay ? "auto" : "none",
        opacity: ui.showOverlay ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        target.classList.contains("left-menu-overlay")
          ? dispatch(hideEverything())
          : "";
      }}
    >
      {props.children}
    </motion.div>
  );
}
