import { motion } from "framer-motion";

import { useState } from "react";
import Header from "./Header";
interface Props {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}
export default function SearchOverlay(props: Props) {
  const { showSearch, setShowSearch } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [query, setQuery] = useState("");

  const messages: {
    sender: string;
    date: string;
    content: string;
    profileImg: string;
  }[] = [
    {
      sender: "Walter",
      date: "Jul, 4",
      content: "Jesse, Jesseeee",
      profileImg:
        "https://i.kym-cdn.com/entries/icons/facebook/000/031/673/hank_died_walt_cries_(breaking_bad_spoilers)_1-35_screenshot.jpg",
    },
    {
      sender: "Jesse",
      date: "Jul, 4",
      content: "Hey yo Mista Wite, sssup?",
      profileImg:
        "https://ih0.redbubble.net/image.2289245060.4528/raf,360x360,075,t,fafafa:ca443f4786.jpg",
    },
    {
      sender: "Walter",
      date: "Jul, 4",
      content: "Jesse, I need you, RIGHT NOW!",
      profileImg:
        "https://i.kym-cdn.com/entries/icons/facebook/000/031/673/hank_died_walt_cries_(breaking_bad_spoilers)_1-35_screenshot.jpg",
    },
    {
      sender: "Jesse",
      date: "Jul, 4",
      content: "No, beeatch",
      profileImg:
        "https://ih0.redbubble.net/image.2289245060.4528/raf,360x360,075,t,fafafa:ca443f4786.jpg",
    },
  ];

  return (
    <motion.div
      className="md:w-[60%] xl:w-[40%] h-full overflow-y-scroll bg-slate-800 absolute top-0 right-0"
      initial={{ x: 1000 }}
      animate={{ x: showSearch ? 0 : 1000 }}
      transition={{ duration: 0.25 }}
    >
      <Header
        query={query}
        setQuery={setQuery}
        setShowSearch={setShowSearch}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="pt-[2rem]">
        <h3 className="text-xl text-gray-300 font-medium  pl-[3rem]">{`${"200"} messages found`}</h3>
        <ul className="w-full px-[1rem] mt-[1.5rem] ">
          {messages.map((msg, i) => {
            return (
              <li
                key={i}
                className="hover:bg-gray-700 duration-300 rounded-xl py-[0.6rem] pl-[0.6rem] pr-[1.3rem] flex gap-[1rem] w-full cursor-pointer  "
              >
                <div className="w-[5rem] h-[5rem] rounded-full overflow-hidden">
                  <img
                    src={msg.profileImg}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-[0.2rem] flex-1">
                  <div className="flex justify-between">
                    <h5 className="text-2xl font-semibold">{msg.sender}</h5>
                    <span className="text-md ">{msg.date}</span>
                  </div>
                  <p className="text-xl font-normal">{msg.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
