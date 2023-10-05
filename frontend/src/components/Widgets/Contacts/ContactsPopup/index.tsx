import Contacts from "../ContactsMainElement";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { ReduxState } from "../../../../interfaces/redux";
import styles from "../styles.module.scss";
import {
  hideEverything,
  setShowContacts,
  setShowCreateContact,
} from "../../../../state/ui";
export default function ContactsPopup() {
  const dispatch = useDispatch();
  const { showContacts } = useSelector((state: ReduxState) => state.ui);
  return (
    <motion.form
      className="absolute md:top-[15%] 2xl:top-[20%] left-[40%] bg-gray-900 py-[1rem]  rounded-xl flex flex-col z-[50]"
      initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
      animate={{
        opacity: showContacts ? 1 : 0,
        x: showContacts ? 0 : 100,
        pointerEvents: showContacts ? "auto" : "none",
      }}
    >
      <div className="pl-[2rem] pr-[1.5rem] pt-[1rem] flex justify-between items-center mb-[1.2rem]">
        <span className="text-2xl font-medium">Contacts</span>
      </div>
      <div className="max-h-[35rem] overflow-y-scroll">
        <Contacts />
      </div>
      <div className="flex justify-between  text-purple-500 text-xl font-medium mt-[1.4rem] px-[1rem]">
        <button
          type="button"
          className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
          onClick={() => {
            dispatch(setShowContacts());
            dispatch(setShowCreateContact());
          }}
        >
          Add Contact
        </button>
        <button
          type="button"
          className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
          onClick={() => dispatch(hideEverything())}
        >
          Close
        </button>
      </div>
    </motion.form>
  );
}
