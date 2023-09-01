import { BiInfoCircle } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  setShowSettings,
  setShowMyAccountSettings,
} from "../../../../../../state/ui";

export default function Popup() {
  const dispatch = useDispatch();

  return (
    <ul className="bg-gray-900 rounded-xl">
      <li
        onClick={() => {
          dispatch(setShowSettings());
          dispatch(setShowMyAccountSettings());
        }}
        className="infoPopupItem text-white flex items-center gap-[1rem] py-[0.8rem] px-[1rem] w-fit hover:bg-gray-800 duration-150 cursor-pointer"
      >
        <BiInfoCircle className="text-3xl" />
        <p className="text-xl w-[10rem] font-light">Edit profile</p>
      </li>
      <li className=" infoPopupItem text-red-600 flex items-center gap-[1rem] py-[0.8rem] px-[1rem] w-fit hover:bg-gray-800 duration-150 cursor-pointer">
        <IoLogOutOutline className="text-3xl" />
        <p className="text-xl w-[10rem] font-light">Log out</p>
      </li>
    </ul>
  );
}
