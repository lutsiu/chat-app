import { BiInfoCircle } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  setShowSettings,
  setShowMyAccountSettings,
  hideEverything,
} from "../../../../../../state/ui";
import { useNavigate } from "react-router-dom";
export default function Popup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(hideEverything());
    localStorage.clear();
    navigate('/');
  }
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
      <li className=" infoPopupItem text-red-600 flex items-center gap-[1rem] py-[0.8rem] px-[1rem] w-fit hover:bg-gray-800 duration-150 cursor-pointer" onClick={handleLogout}>
        <IoLogOutOutline className="text-3xl" />
        <p className="text-xl w-[10rem] font-light">Log out</p>
      </li>
    </ul>
  );
}
