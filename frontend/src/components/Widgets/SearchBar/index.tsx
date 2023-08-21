/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
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
        className="py-[0.7rem] px-[1.2rem] w-full bg-slate-700 text-2xl rounded-3xl outline-none"
      />
      {showCross && (
        <IoMdClose
          className="absolute top-[0.8rem] text-3xl text-zinc-400 right-[1rem] hover:text-white duration-200 cursor-pointer"
          onClick={() => {setInputValue('')}}
        />
      )}
    </form>
  );
}
