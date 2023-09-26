import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import MenuOverlay from "../Overlays/MenuOverlay";
import ProfileOverlay from "../Overlays/ProfileOverlay";
import EditProfile from "../Overlays/ProfileOverlay/EditProfile";
import SearchOverlay from "../Overlays/SearchOverlay";
import { HiOutlineArrowLeft } from "react-icons/hi";
import useResponsive from "../../../hooks/useResponsive";
import { useNavigate } from "react-router-dom";
import ResponsiveSearch from "../Overlays/SearchOverlay/Responsive";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { setShowSearchBar } from "../../../state/ui";
import { setSearchedMessages } from "../../../state/message";
interface Props {
  chatId: string;
}
export default function Header(props: Props) {
  const { showSearchBar } = useSelector((state: ReduxState) => state.ui);
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const width = useResponsive();
  const navigate = useNavigate();
  const showNavContent = (width < 768 && !showSearchBar) || width >= 768;
  const dispatch = useDispatch();
  return (
    <>
      <nav className="flex items-center sticky w-full bg-slate-800 top-0 py-[0.6rem] px-[1rem] md:px-[2rem] gap-[1.4rem]">
        {width < 768 && (
          <div
            className="block"
            onClick={() => {
              if (showSearchBar) {
                dispatch(setShowSearchBar());
                dispatch(setSearchedMessages(null))
                setQuery('2')
              } else {
                navigate("/home");
              }
            }}
          >
            <HiOutlineArrowLeft className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full text-gray-400 active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer" />
          </div>
        )}

        {showNavContent && (
          <>
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
                {width >= 768 && (
                  <div onClick={() => dispatch(setShowSearchBar())}>
                    <HiMagnifyingGlass className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer" />
                  </div>
                )}
                <div onClick={() => setShowMenuOverlay(true)}>
                  <BsThreeDotsVertical className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer" />
                </div>
              </div>
            </div>
          </>
        )}
        {width < 768 && showSearchBar && (
          <ResponsiveSearch
            query={query}
            setQuery={setQuery}
            chatId={props.chatId}
            debouncedQuery={debouncedQuery}
            setDebouncedQuery={setDebouncedQuery}
          />
        )}
      </nav>
      <MenuOverlay
        showOverlay={showMenuOverlay}
        setShowOverlay={setShowMenuOverlay}
      />
      {width >= 768 && (
        <SearchOverlay
          chatId={props.chatId}
          query={query}
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          setDebouncedQuery={setDebouncedQuery}
        />
      )}
      <ProfileOverlay
        setShowOverlay={setShowProfile}
        showOverlay={showProfile}
      />
      <EditProfile setShowProfile={setShowProfile} />
    </>
  );
}
