import { IoCloseOutline } from "react-icons/io5";
import { PiArrowLeftLight, PiUserCircleLight } from "react-icons/pi";
import {
  hideEverything,
  setShowMyAccountSettings,
  setShowSettings,
} from "../../../../../state/ui";
import { useDispatch } from "react-redux";

export default function Panel() {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-[22rem] items-baseline pl-[2rem] box-border">
      <div className="flex gap-[2rem] items-center">
        <PiArrowLeftLight
          className="min-w-[3rem] min-h-[3rem] text-zinc-400 cursor-pointer hover:text-white duration-150 active:bg-gray-800 active:rounded-full p-[0.3rem]"
          onClick={() => {
            dispatch(setShowMyAccountSettings());
            dispatch(setShowSettings());
          }}
        />

        <span className="text-2xl">Info</span>
      </div>

      <IoCloseOutline
        className="min-w-[3rem] min-h-[3rem] text-zinc-400 cursor-pointer hover:text-white duration-150 active:bg-gray-800 active:rounded-full p-[0.3rem]"
        onClick={() => {
          dispatch(hideEverything());
        }}
      />
    </div>
  );
}
