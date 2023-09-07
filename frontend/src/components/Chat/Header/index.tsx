import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import MenuOverlay from "../Overlays/MenuOverlay";
import ProfileOverlay from "../Overlays/ProfileOverlay";
import EditProfile from "../Overlays/ProfileOverlay/EditProfile";
import SearchOverlay from "../Overlays/SearchOverlay";
export default function Header() {
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <>
      <nav className="flex sticky w-full bg-slate-800 top-0 py-[0.6rem] px-[2rem] gap-[1.4rem]">
        <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden">
          <img
            src="https://sklepotaku.pl/userdata/public/news/images/4.jpg"
            alt="Avatar"
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />
        </div>
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-semibold tracking-wide">
              {"Username"}
            </span>
            <span className="text-lg font-normal text-gray-300">
              {"Status"}
            </span>
          </div>
          <div className="flex items-center gap-[2rem] text-gray-400">
            <div onClick={() => setShowSearch(true)}>
              
              <HiMagnifyingGlass className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer" />
            </div>
            <div onClick={() => setShowMenuOverlay(true)}>
              <BsThreeDotsVertical className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>
      <MenuOverlay
        showOverlay={showMenuOverlay}
        setShowOverlay={setShowMenuOverlay}
      />
      <SearchOverlay showSearch={showSearch} setShowSearch={setShowSearch}/>
      <ProfileOverlay
        setShowOverlay={setShowProfile}
        showOverlay={showProfile}
      />
      <EditProfile setShowProfile={setShowProfile} />
    </>
  );
}
