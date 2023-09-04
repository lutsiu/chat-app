import { useState } from "react";
import { BiLeftArrowAlt, BiPencil } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { IoLogOutOutline } from "react-icons/io5";
import { hideEverything } from "../../../../../state/ui";
import { useDispatch } from "react-redux";
export default function Header() {
  const [leftArrowIsActive, setLeftArrowIsActive] = useState(false);
  const [pencilIsActive, setPencilIsActive] = useState(false);
  const [optionsAreActive, setOptionsAreActive] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center pl-[1.3rem] py-[0.5rem]  gap-[1.5rem]  bg-gray-800">
      <div className="flex items-center ">
        <div
          className="p-[0.7rem] rounded-full"
          style={{
            backgroundColor: leftArrowIsActive ? "rgba(55, 65, 81, 0.5)" : "",
          }}
        >
          <BiLeftArrowAlt
            className="text-4xl"
            onTouchStart={() => setLeftArrowIsActive(true)}
            onTouchEnd={() => setLeftArrowIsActive(false)}
            onClick={() => {
              dispatch(hideEverything());
      
            }}
          />
        </div>
      </div>
      <div

        className="flex-1 flex  justify-between items-center gap-[2rem] pr-[1rem] text-3xl"
      >
        <div className="flex flex-col gap-[0.3rem]">
          <span className="text-2xl font-medium tracking-wide">Settings</span>
        </div>

        <div className="flex items-center gap-[1rem]">
          <div
            className="p-[0.7rem] rounded-full"
            style={{
              backgroundColor: pencilIsActive ? "rgba(55, 65, 81, 0.5)" : "",
            }}
          >
            <BiPencil
              onTouchStart={() => setPencilIsActive(true)}
              onTouchEnd={() => setPencilIsActive(false)}
              /* onClick={() => setShowSearchBar(true)} */
            />
          </div>
          <div
            className="p-[0.7rem] rounded-full"
            style={{
              backgroundColor: optionsAreActive ? "rgba(55, 65, 81, 0.5)" : "",
            }}
          >
            <SlOptionsVertical
              onTouchStart={() => setOptionsAreActive(true)}
              onTouchEnd={() => setOptionsAreActive(false)}
              /* onClick={() => setShowSearchBar(true)} */
              className="text-2xl"
            />
          </div>

          
        </div>
      </div>
      
    </div>
  )
}