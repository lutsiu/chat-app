import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { HiMiniArrowLeft, HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEverything } from "../../../../../state/ui";
import { ReduxState } from "../../../../../interfaces/redux";
import { setSearchContact } from "../../../../../state/createContact";
interface Props {
  showSearchBar: boolean;
  setShowSearchBar: (show: boolean) => void;

}

export default function Header(props: Props) {
  const {contactQuery} = useSelector((state: ReduxState) => state.createContact);
  const { setShowSearchBar, showSearchBar } = props;
  const [leftArrowIsActive, setLeftArrowIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [showCross, setShowCross] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (contactQuery) {
      setShowCross(true);
    } else {
      setShowCross(false);
    }
  }, [contactQuery]);
  return (
    <div className="flex items-center pl-[1.3rem] py-[0.5rem]  gap-[1.5rem]  mb-[1rem]  bg-gray-800">
      <div className="flex items-center ">
        <div
          className="p-[0.7rem] rounded-full"
          style={{
            backgroundColor: leftArrowIsActive ? "rgba(55, 65, 81, 0.5)" : "",
          }}
        >
          <HiMiniArrowLeft
            className="text-4xl"
            onTouchStart={() => setLeftArrowIsActive(true)}
            onTouchEnd={() => setLeftArrowIsActive(false)}
            onClick={() => {
              if (!showSearchBar) {
                dispatch(hideEverything());
              } else {
                setShowSearchBar(false);
                dispatch(setSearchContact(''));
              }
            }}
          />
        </div>
      </div>
      <motion.div
        animate={{
          display: !showSearchBar ? "flex" : "none",
        }}
        className="flex-1  justify-between items-center gap-[2rem] pr-[1rem] text-3xl"
      >
        <div className="flex flex-col gap-[0.3rem]">
          <span className="text-2xl font-medium tracking-wide">Contacts</span>
        </div>

        <div className="flex gap-[1rem]">
          <div
            className="p-[0.7rem] rounded-full"
            style={{
              backgroundColor: searchIsActive ? "rgba(55, 65, 81, 0.5)" : "",
            }}
          >
            <HiMiniMagnifyingGlass
              onTouchStart={() => setSearchIsActive(true)}
              onTouchEnd={() => setSearchIsActive(false)}
              onClick={() => setShowSearchBar(true)}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ display: showSearchBar ? "block" : "none" }}
        className="w-full relative flex-1"
      >
        <input
          type="text"
          name="contactQuery"
          className="w-full bg-transparent outline-none text-2xl pr-[4rem]"
          onChange={(e) => dispatch(setSearchContact(e.target.value))}
          value={contactQuery}
          placeholder="Search"
        />

        <motion.div
          className=" flex absolute top-[-0.2rem] right-[1rem]"
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
              dispatch(setSearchContact(''));
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
