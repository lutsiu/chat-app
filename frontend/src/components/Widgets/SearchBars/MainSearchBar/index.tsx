/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
export default function SearchBar() {
  const [showCross, setShowCross] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue) {
      setShowCross(true);
    } else {
      setShowCross(false);
    }
  }, [inputValue]);

  return (
    <form className="w-full relative box-border">
      <input
        type="text"
        name="query"
        placeholder="Search"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
        className="py-[0.7rem] pl-[1.2rem] pr-[4rem] w-full bg-slate-700 text-2xl rounded-3xl outline-none"
      />
      <motion.div
        className=" flex absolute top-[0.8rem] right-[1rem]"
        initial={{width: 0, height: 0 }}
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
    </form>
  );
}
