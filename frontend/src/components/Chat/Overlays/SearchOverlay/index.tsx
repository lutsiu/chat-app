import { motion } from "framer-motion";
import { HiMagnifyingGlass, HiArrowLeft } from "react-icons/hi2";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { mediumPurple, gray } from "../../../../utils/colors";
import { useState } from "react";
interface Props {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}
export default function SearchOverlay(props: Props) {
  const { showSearch, setShowSearch } = props;
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <motion.div
      className="md:w-[60%] xl:w-[40%] h-full overflow-y-scroll bg-slate-800 absolute top-0 right-0"
      initial={{ x: 1000 }}
      animate={{ x: showSearch ? 0 : 1000 }}
      transition={{ duration: 0.25 }}
    >
      <div className="pl-[1rem] flex items-center gap-[1.2rem] py-[0.8rem]">
        <div onClick={() => setShowSearch(false)}>
          <HiArrowLeft className="text-gray-300 p-[0.7rem] hover:bg-gray-700 duration-200 min-h-[3.5rem] min-w-[3.5rem] cursor-pointer rounded-full" />
        </div>
        <form
          className="rounded-3xl relative px-[1rem] flex items-center py-[0.8rem] bg-gray-900 border-[1px] duration-200"
          style={{ borderColor: inputIsFocused ? mediumPurple : gray }}
        >
          <HiMagnifyingGlass
            className="text-3xl mr-[1.3rem] duration-200 absolute left-[0.5rem] top-[0.9rem]"
            style={{ color: inputIsFocused ? mediumPurple : gray }}
          />
          <input
            type="text"
            name="chatQuery"
            className="flex-1 bg-transparent outline-none text-2xl font-medium px-[2.5rem]"
            onFocus={() => setInputIsFocused(true)}
            onBlur={() => setInputIsFocused(false)}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <IoMdClose
            className="text-4xl ml-[1rem] duration-200 absolute right-[0.5rem] top-[0.75rem] cursor-pointer"
            style={{
              color: inputIsFocused ? mediumPurple : gray,
              opacity: query ? 1 : 0,
              pointerEvents: query ? "all" : "none",
            }}
            onClick={() => setQuery("")}
          />
        </form>
        <div>
          <AiOutlineCalendar className="text-gray-300 p-[0.7rem] hover:bg-gray-700 duration-200 min-h-[3.5rem] min-w-[3.5rem] cursor-pointer rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
