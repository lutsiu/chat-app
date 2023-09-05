import { Link, NavLink } from "react-router-dom";
import { IoCheckmarkOutline, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { gray, lightPurple, mediumPurple, white } from "../../utils/colors";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
export default function ChatListItem() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuLeft, setContextMenuLeft] = useState(0);
  const [contextMenuTop, setContextMenuTop] = useState(0);
  const user = {
    userName: "sasha",
    fullName: "Sanka",
  };
  const location = useLocation();
  const isActive = user.userName === location.pathname.slice(0, -1);

  function handleShowContextMenu(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const position: {
      x: number;
      y: number;
    } = { x: e.clientX, y: e.clientY };
    setContextMenuLeft(position.x);
    setContextMenuTop(position.y);
    setShowContextMenu(true);
  }

  return (
    <>
      <li className="w-full" onContextMenu={handleShowContextMenu}>
        <NavLink
          to={`/${user.userName}`}
          className={({ isActive }) =>
            isActive
              ? "w-full h-full flex gap-[1rem] bg-purple-800"
              : "w-full h-full flex gap-[1rem]  hover:bg-slate-700 px-[0.8rem] py-[0.4rem]"
          }
        >
          <div className="flex-[1]">
            <div className="w-[4.5rem] h-[4.5rem]">
              <img
                src="https://i.pinimg.com/736x/66/82/e6/6682e6bd841d40dbdd7f77dee789a0cf.jpg"
                alt="User's avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col flex-[9]  justify-between pb-[0.2rem]">
            <div className="flex justify-between items-start ">
              <h2 className="text-xl font-medium">{user.fullName}</h2>
              <div className="flex gap-[0.2rem] items-center">
                <IoCheckmarkOutline
                  className="text-2xl"
                  style={{ color: isActive ? white : mediumPurple }}
                />
                <span
                  className="text-xl"
                  style={{ color: isActive ? white : "lightgray" }}
                >
                  12:54 PM
                </span>
              </div>
            </div>
            <p
              className=" font-light text-lg"
              style={{ color: isActive ? white : "lightgray" }}
            >
              Some message
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
