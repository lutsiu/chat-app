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
import { IContact, IStatus } from "../../../interfaces/models";
import SkeletonElement from "../../Widgets/Skeletons/SkeletonElement";
import loader from "../../../assets/tail-spin.svg";
import { useSocket } from "../../../context/SocketContext";
import normalizeDateOfStatus from "../../../utils/normalizeDateOfStatus";
import BACKEND_SERVER from "../../../utils/VARIABLES";

export default function Header() {
  const { interlocutor, dataIsLoading } = useSelector((state: ReduxState) => {
    return state.chat;
  });
  const socket = useSocket();
  const { showSearchBar } = useSelector((state: ReduxState) => state.ui);
  const { user } = useSelector((state: ReduxState) => state.user);
  const [interlocutorStatus, setInterlocutorStatus] = useState<IStatus | null>(
    interlocutor?.status ? interlocutor.status : null
  );
  const [interlocutorStatusString, setInterlocutorStatusString] = useState<
    string | undefined
  >("");
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isContact, setIsContact] = useState<undefined | IContact>(undefined);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const width = useResponsive();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showNavContent = (width < 768 && !showSearchBar) || width >= 768;

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
  useEffect(() => {
    if (user?.contacts && interlocutor) {
      const contact = user.contacts.find(
        (contact) => contact._id === interlocutor._id
      );
      setIsContact(contact);
    }
  }, [interlocutor, user?.contacts]);

  useEffect(() => {
    socket.on(
      "update-status-in-chat",
      (data: { userId: string; isActive: boolean; lastTimeSeen: Date }) => {
        if (data && interlocutor?._id) {
          const { userId, isActive, lastTimeSeen } = data;
          if (userId !== interlocutor._id) return;

          setInterlocutorStatus({ lastTimeSeen, isActive });
        }
      }
    );
  }, [interlocutor?._id, socket]);

  useEffect(() => {
    if (!interlocutorStatus || !interlocutorStatus.lastTimeSeen) {
      setInterlocutorStatusString('recently');
      return
    }
    const interlocutorStatusAsString = normalizeDateOfStatus(
      interlocutorStatus?.lastTimeSeen as Date
    );

    setInterlocutorStatusString(interlocutorStatusAsString);
  }, [interlocutorStatus]);

  useEffect(() => {
    function updateInterlocutorDate() {
      if (interlocutor?.status.isActive || interlocutorStatus?.isActive) return;
      if (!interlocutorStatus || !interlocutorStatus.lastTimeSeen) return;
      const updatedDate = normalizeDateOfStatus(
        interlocutorStatus.lastTimeSeen as Date
      );
      setInterlocutorStatusString(updatedDate);
    }
    setInterval(() => {
      updateInterlocutorDate();
    }, 60 * 1000);
  }, [interlocutor?.status.isActive, interlocutorStatus]);
  
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
            <HiOutlineArrowLeft className="p-[0.7rem] min-h-[3.5rem] min-w-[3.5rem] rounded-full text-gray-400 active:bg-gray-700 hover:bg-gray-700 duration-200 cursor-pointer" />
          </div>
        )}

        {showNavContent && (
          <>
            <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={
                  interlocutor
                    ? `${BACKEND_SERVER}/${interlocutor.profilePictures.at(-1)}`
                    : loader
                }
                alt="Avatar"
                className="object-cover cursor-pointer"
                onClick={() => setShowProfile((prev) => !prev)}
                style={{
                  width: interlocutor ? "100%" : "50%",
                  height: interlocutor ? "100%" : "50%",
                }}
              />
            </div>
            <div className="flex-1 flex justify-between">
              <div className="flex flex-col justify-center">
                {!interlocutor && dataIsLoading && (
                  <SkeletonElement count={1} className="w-[10rem] h-[1rem]" />
                )}
                {interlocutor && (
                  <span className="text-2xl font-semibold tracking-wide">
                    {!isContact ? `${interlocutor.fullName}` : isContact.name}
                  </span>
                )}
                <span className="text-lg font-normal text-gray-300">
                  {interlocutorStatus?.isActive
                    ? "active"
                    : `last seen: ${interlocutorStatusString}`}
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
