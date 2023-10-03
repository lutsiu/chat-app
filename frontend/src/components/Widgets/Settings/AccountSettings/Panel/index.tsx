import { IoCloseOutline } from "react-icons/io5";
import { PiArrowLeftLight, PiUserCircleLight } from "react-icons/pi";
import {
  hideEverything,
  setShowMyAccountSettings,
  setShowSettings,
} from "../../../../../state/ui";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../../../context/SocketContext";
import { ReduxState } from "../../../../../interfaces/redux";
import { useEffect } from "react";

interface Props {
  bio: string,
  bioBeingChanged: boolean
}
export default function Panel(props: Props) {
  const {bio, bioBeingChanged} = props;
  const {user} = useSelector((state: ReduxState) => state.user);
  const socket = useSocket();
  const dispatch = useDispatch();
  
  function saveBio() {
    socket.emit('change-bio', {userId: user?._id, bio});
  }
  return (
    <div className="flex gap-[22rem] items-baseline pl-[2rem] box-border">
      <div className="flex gap-[2rem] items-center">
        <PiArrowLeftLight
          className="min-w-[3rem] min-h-[3rem] text-zinc-400 cursor-pointer hover:text-white duration-150 active:bg-gray-800 active:rounded-full p-[0.3rem]"
          onClick={() => {
            if (bioBeingChanged) {
              saveBio();
            }
            dispatch(setShowMyAccountSettings());
            dispatch(setShowSettings());
          }}
        />

        <span className="text-2xl">Info</span>
      </div>

      <IoCloseOutline
        className="min-w-[3rem] min-h-[3rem] text-zinc-400 cursor-pointer hover:text-white duration-150 active:bg-gray-800 active:rounded-full p-[0.3rem]"
        onClick={() => {
          if (bioBeingChanged) {
            saveBio();
          }
          dispatch(hideEverything());
        }}
      />
    </div>
  );
}
