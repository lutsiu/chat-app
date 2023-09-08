import { HiMagnifyingGlass, HiArrowLeft } from "react-icons/hi2";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { mediumPurple, gray } from "../../../../../utils/colors";
import { useState } from "react";
interface Props {
  setShowSearch: (show: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
}
export default function Header(props: Props) {

  const [inputIsFocused, setInputIsFocused] = useState(false);
  const {setQuery, setShowSearch, query} = props;
  return (
    <div className="pr-[1rem] pl-[2rem] flex items-center  justify-between py-[0.8rem] overflow-x-hidden sticky top-0 bg-gray-800">
      <div onClick={() => setShowSearch(false)}>
        <HiArrowLeft className="text-gray-300  p-[0.7rem] hover:bg-gray-700 duration-200 h-[3.5rem] w-[3.5rem] cursor-pointer rounded-full" />
      </div>
      <form
        className="rounded-3xl relative px-[1rem] flex w-[75%]  items-center py-[0.8rem] bg-gray-900 border-[1px] duration-200"
        style={{ borderColor: inputIsFocused ? mediumPurple : gray }}
      >
        <HiMagnifyingGlass
          className="text-3xl mr-[1.3rem] duration-200 absolute left-[0.5rem] top-[0.9rem]"
          style={{ color: inputIsFocused ? mediumPurple : gray }}
        />
        <input
          type="text"
          name="chatQuery"
          className="w-full bg-transparent outline-none text-2xl font-medium px-[2.5rem]"
          placeholder="Search"
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <IoMdClose
          className="text-4xl duration-200 absolute right-[0.5rem] top-[0.75rem] cursor-pointer"
          style={{
            color: inputIsFocused ? mediumPurple : gray,
            opacity: query ? 1 : 0,
            pointerEvents: query ? "all" : "none",
          }}
          onClick={() => setQuery("")}
        />
      </form>
      <div>
        <AiOutlineCalendar className="text-gray-300 p-[0.7rem] hover:bg-gray-700 duration-200 h-[3.5rem] w-[3.5rem] cursor-pointer rounded-full" />
      </div>
    </div>
  );
}
