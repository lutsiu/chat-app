/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdClose } from "react-icons/io";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setSearchContact } from "../../../../state/createContact";

export default function ContactsSearchBar() {
  const [showCross, setShowCross] = useState(false);
  const {contactQuery} = useSelector((state: ReduxState) => state.createContact);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contactQuery) {
      setShowCross(true);
    } else {
      setShowCross(false);
    }
  }, [contactQuery]);

  return (
    <form className="w-full relative box-border">
      <div className="flex flex-wrap items-center pl-[1.2rem]">
        <HiMiniMagnifyingGlass
          className="text-zinc-400 text-2xl"
          style={{ transform: "rotateY(180deg)" }}
        />
        <div className="relative flex-1">
          <input
            type="text"
            name="query"
            placeholder="Search"
            autoFocus
            onChange={(e) => {
              dispatch(setSearchContact(e.target.value));
            }}
            value={contactQuery}
            className="py-[0.7rem] px-[0.8rem] w-full  bg-slate-900 text-xl rounded-3xl outline-none pr-[3rem]"
          />
          <motion.div
            className=" flex absolute top-[0.5rem] right-[1rem]"
            initial={{ width: 0, height: 0 }}
            animate={{
              width: showCross ? "2rem " : "0",
              height: showCross ? "2rem " : "0",
              rotate: showCross ? 0 : 200,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              duration: 0.7,
              damping: 20,
            }}
          >
            <IoMdClose
              className="w-full h-full text-zinc-400 hover:text-white duration-200 cursor-pointer"
              onClick={() => {
                dispatch(setSearchContact(""));
              }}
            />
          </motion.div>
        </div>
      </div>
    </form>
  );
}
