import Contacts from "../ContactsMainElement";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import styles from "../styles.module.scss";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { hideEverything, setShowContacts, setShowCreateContact } from "../../../../state/ui";
export default function ContactsPopup() {
  const dispatch = useDispatch();
  const { showContacts } = useSelector((state: ReduxState) => state.ui);
  const [sortDescending, setSortDescending] = useState(true);
  return (
    <motion.form
      className="absolute top-[20%] left-[40%] bg-gray-900 py-[1rem]  rounded-xl flex flex-col "
      initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
      animate={{
        opacity: showContacts ? 1 : 0,
        x: showContacts ? 0 : 100,
        pointerEvents: showContacts ? "auto" : "none",
      }}
    >
      <div className="pl-[2rem] pr-[1.5rem] pt-[1rem] flex justify-between items-center mb-[1.2rem]">
        <span className="text-2xl font-medium">Contacts</span>
        {!sortDescending && <AiOutlineSortDescending onClick={() => setSortDescending(true)} className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer" />}
        {sortDescending && <AiOutlineSortAscending onClick={() => setSortDescending(false)}  className="text-4xl text-zinc-400 hover:text-white duration-200 cursor-pointer" />}
      </div>
      <Contacts />
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
