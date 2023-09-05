import { BiLeftArrowAlt } from "react-icons/bi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setShowMyAccountSettings,
  setShowSettings,
} from "../../../../../../state/ui";

export default function Header() {
  const [leftArrowIsActive, setLeftArrowIsActive] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center pl-[1.3rem] py-[0.6rem]   gap-[1.5rem]  bg-gray-800 ">
      <div
        className="p-[0.6rem] rounded-full"
        style={{
          backgroundColor: leftArrowIsActive ? "rgba(55, 65, 81, 0.5)" : "",
        }}
      >
        <BiLeftArrowAlt
          className="text-4xl"
          onTouchStart={() => setLeftArrowIsActive(true)}
          onTouchEnd={() => setLeftArrowIsActive(false)}
          onClick={() => {
            dispatch(setShowMyAccountSettings());
            dispatch(setShowSettings());
          }}
        />
      </div>
      <span className="text-2xl font-medium tracking-wide">Edit profile</span>
    </div>
  );
}
