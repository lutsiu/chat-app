import { HiOutlineUserCircle } from "react-icons/hi";
import { BiBell } from "react-icons/bi";
import { AiOutlineLock, AiOutlineFolder } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { IoCallOutline } from "react-icons/io5";
import { CiBatteryCharging } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";

export default function SettingsList() {
  return (
    <ul className="bg-gray-900 pt-[0.5rem] pb-[1rem]">
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <HiOutlineUserCircle className="text-4xl" />
        <span className="text-xl">My Account</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <BiBell className="text-4xl" />
        <span className="text-xl">Notifications</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <AiOutlineLock className="text-4xl" />
        <span className="text-xl">Privacy and Security</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <BsChat className="text-4xl" />
        <span className="text-xl">Chat Settings</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <AiOutlineFolder className="text-4xl" />
        <span className="text-xl">Folders</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <VscSettings className="text-4xl" />
        <span className="text-xl">Advanced</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <IoCallOutline className="text-4xl" />
        <span className="text-xl">Calls Settings</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer gap-[1.5rem] items-center hover:bg-gray-800 duration-200">
        <CiBatteryCharging className="text-4xl" />
        <span className="text-xl">Battery</span>
      </li>
      <li className="flex px-[1.5rem] py-[0.8rem] cursor-pointer justify-between items-center hover:bg-gray-800 duration-200">
        <div className="flex gap-[1.5rem] items-center ">
          <HiLanguage className="text-4xl" />
          <span className="text-xl ">Language</span>
        </div>
        <span className="text-purple-500 text-xl">English</span>
      </li>
    </ul>
  );
}
