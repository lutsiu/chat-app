import { Link, NavLink } from "react-router-dom";
import { IoCheckmarkOutline, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { gray, lightPurple, mediumPurple, white } from "../../utils/colors";
export default function ChatListItem() {
  const user = {
    userName: "sasha",
    fullName: "Sanka",
  };
  const location = useLocation();
  const isActive = user.userName === location.pathname.slice(0, -1);

  return (
    <li className="w-full ">
      <NavLink
        to={`/${user.userName}`}
        className={({ isActive }) =>
          isActive
            ? "w-full h-full flex gap-[1.3rem] bg-purple-800"
            : "w-full h-full flex gap-[1.3rem]  hover:bg-slate-700 px-[0.8rem] py-[0.4rem]"
        }
      >
        <div className="w-[4.5rem] h-[4.5rem]">
          <img
            src="https://i.pinimg.com/736x/66/82/e6/6682e6bd841d40dbdd7f77dee789a0cf.jpg"
            alt="User's avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col w-full justify-between pb-[0.2rem]">
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
  );
}
