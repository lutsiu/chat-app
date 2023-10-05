import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState, useCallback } from "react";
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
import { IMessage, UserModel } from "../../../interfaces/models";
interface Props {
  chatId: string;
  chatMessages: IMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
  interlocutor: UserModel
}
export default function Header(props: Props) {
  const {chatMessages, chatId, interlocutor} = props
  const { showSearchBar } = useSelector((state: ReduxState) => state.ui);
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const width = useResponsive();
  const navigate = useNavigate();
  const showNavContent = (width < 768 && !showSearchBar) || width >= 768;
  const dispatch = useDispatch();
  const resetSearch = useCallback(() => {
    dispatch(setShowSearchBar());
    dispatch(setSearchedMessages(null));
    setQuery("");
  }, [dispatch, setQuery]);
  useEffect(() => {
    window.addEventListener("beforeunload", resetSearch);
    return () => {
      window.removeEventListener("beforeunload", resetSearch);
    };
  }, [resetSearch]);
  return (
    <>
      <nav className="flex items-center sticky w-full bg-slate-800 top-0 py-[0.6rem] px-[1rem] md:px-[2rem] gap-[1.4rem]">
        {width < 768 && (
          <div
            className="block"
            onClick={() => {
              if (showSearchBar) {
                resetSearch();
              } else {
                navigate("/home");
              }
            }}
          >
            <HiOutlineArrowLeft className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full text-gray-400 active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer"  />
          </div>
        )}

        {showNavContent && (
          <>
            <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden">
              <img
                src={`http://localhost:3000/${interlocutor.profilePictures.at(-1)}`}
                alt="Avatar"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowProfile((prev) => !prev)}
              />
            </div>
            <div className="flex-1 flex justify-between">
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-semibold tracking-wide">
                  {`${interlocutor.fullName}`}
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
        interlocutor={interlocutor}
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
        chatHistory={chatMessages}
        user={interlocutor}
        chatId={chatId}
      />
      <EditProfile setShowProfile={setShowProfile} />
    </>
  );
}
