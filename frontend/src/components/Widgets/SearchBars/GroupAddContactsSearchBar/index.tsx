/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdClose } from "react-icons/io";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import GroupAddedUser from "../../Group/GroupAddedUser";
import useResponsive from "../../../../hooks/useResponsive";
export default function GroupAddContactsSearchBar() {
  const [showCross, setShowCross] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { groupUsers } = useSelector((state: ReduxState) => state.createGroup);
  const width = useResponsive();
  useEffect(() => {
    if (inputValue) {
      setShowCross(true);
    } else {
      setShowCross(false);
    }
  }, [inputValue]);

  return (
    <form className="w-full relative box-border">
      <div className="flex flex-wrap items-center pl-[1.2rem]">
        {groupUsers.length > 0 && (
          <ul className="flex gap-[0.5rem] flex-wrap max-w-full">
            {groupUsers.map((user, i) => {
              return <GroupAddedUser key={i} id={user} />;
            })}
          </ul>
        )}
        <div className="relative flex-1">
          <input
            type="text"
            name="query"
            placeholder={width >= 768 ? "Search" : 'Who do you want to add?'}
            autoFocus
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            className="py-[0.7rem] px-[0.8rem] w-full  bg-slate-900 text-xl rounded-3xl outline-none pr-[3rem] min-w-[10rem]"
          />
          {width >= 768 && (
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
                  setInputValue("");
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </form>
  );
}
