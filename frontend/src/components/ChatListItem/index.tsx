import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { white } from "../../utils/colors";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import { ChatData } from "../LeftSide";
import normalizeDateName from "../../utils/normalizeDateName";
import BACKEND_SERVER from "../../utils/VARIABLES";
import {
  setSearchBarIsActive,
  setSearchBarValue,
} from "../../state/peopleSearch";
import { useDispatch } from "react-redux";
interface Props {
  chatData: ChatData;
}
export default function ChatListItem(props: Props) {
  const { chatData } = props;
  const { message, interlocutor } = chatData;
  const { userName, name, profilePicture } = interlocutor;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuLeft, setContextMenuLeft] = useState(0);
  const [contextMenuTop, setContextMenuTop] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const isActive = userName === location.pathname.slice(0, -1);
  function handleShowContextMenu(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) {
    e.preventDefault();
    const position: {
      x: number;
      y: number;
    } = { x: e.clientX, y: e.clientY };
    setContextMenuLeft(position.x);
    setContextMenuTop(position.y);
    setShowContextMenu(true);
  }
  let messageToShow;
  if (message.message) {
    messageToShow = message.message;
  }
  if (!message.message && message.media.length === 0 && message.file) {
    messageToShow = message.file.fileName;
  }
  if (
    !message.message &&
    message.media.length > 0 &&
    message.media.length < 3
  ) {
    messageToShow = message.media.at(-1)?.fileName;
  }
  if (
    !message.message &&
    message.media.length > 0 &&
    message.media.length >= 3
  ) {
    messageToShow = "Album";
  }
  const dateToShow = normalizeDateName(message.timeStamp);
  function hideSearch() {
    dispatch(setSearchBarIsActive(false));
    dispatch(setSearchBarValue(""));
  }
  return (
    <>
      <li className="w-full" onContextMenu={handleShowContextMenu}>
        <NavLink
          to={`/${interlocutor.userName}`}
          className={({ isActive }) =>
            isActive
              ? "w-full h-full flex gap-[1rem] bg-violet-600 px-[0.8rem] py-[0.4rem] rounded-lg"
              : "w-full h-full flex gap-[1rem]  hover:bg-slate-700 px-[0.8rem] py-[0.4rem] rounded-lg"
          }
          style={{ background: showContextMenu ? "rgb(51 65 85)" : "" }}
          onClick={hideSearch}
        >
          <div>
            <div className="w-[5rem] h-[5rem]">
              <img
                src={`${BACKEND_SERVER}/${profilePicture}`}
                alt="User's avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1  justify-between pb-[0.2rem]">
            <div className="flex justify-between items-start ">
              <h2 className="text-xl font-medium mt-[0.4rem]">{name}</h2>
              <div className="flex gap-[0.2rem] items-center">
                <span
                  className="text-xl"
                  style={{ color: isActive ? white : "lightgray" }}
                >
                  {dateToShow}
                </span>
              </div>
            </div>
            <p
              className=" font-light text-lg mb-[0.4rem]"
              style={{ color: isActive ? white : "lightgray" }}
            >
              {typeof messageToShow === "string" && messageToShow.length > 40
                ? messageToShow.slice(0, 40) + "..."
                : messageToShow}
            </p>
          </div>
        </NavLink>
      </li>
      <ContextMenu
        showContextMenu={showContextMenu}
        setShowContextMenu={setShowContextMenu}
        contextMenuLeft={contextMenuLeft}
        contextMenuTop={contextMenuTop}
      />
    </>
  );
}
