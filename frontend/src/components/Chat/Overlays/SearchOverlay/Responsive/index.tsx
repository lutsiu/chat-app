import { useState } from "react";
import {HiMagnifyingGlass} from 'react-icons/hi2'
import { mediumPurple, gray } from "../../../../../utils/colors";
import {IoMdClose} from 'react-icons/io'

interface Props {
  query: string, 
  setQuery: (query: string) => void
}

export default function ResponsiveSearch(props: Props) {
  const {query, setQuery} = props;
  const [inputIsFocused, setInputIsFocused] = useState(false);
  return (
    <form
      className="rounded-3xl relative px-[1rem] flex w-full  items-center py-[0.8rem] bg-gray-900 border-[1px] duration-200"
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
  );
}
