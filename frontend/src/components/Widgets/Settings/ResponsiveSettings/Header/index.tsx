import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiPencil } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { hideEverything, setShowMyAccountSettings, setShowSettings } from "../../../../../state/ui";
import { useDispatch } from "react-redux";
import LogoutOverlay from "./Overlays/LogoutOverlay";
import WarningOverlay from "./Overlays/WarningOverlay";
export default function Header() {
  const [leftArrowIsActive, setLeftArrowIsActive] = useState(false);
  const [pencilIsActive, setPencilIsActive] = useState(false);
  const [optionsAreActive, setOptionsAreActive] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    function disableScroll(e: Event) {
      e.preventDefault();
    }
    if (showLogout) {
      window.addEventListener("scroll", disableScroll);
    } else {
      window.removeEventListener("scroll", disableScroll);
    }
  }, [showLogout]);

  return (
    <>
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
        <div className="flex-1 flex  justify-between items-center gap-[2rem] pr-[1rem] text-3xl">
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
                onClick={() => {
                  dispatch(setShowSettings())
                  dispatch(setShowMyAccountSettings())
                }}
              />
            </div>
            <div
              className="p-[0.7rem] rounded-full"
              style={{
                backgroundColor: optionsAreActive
                  ? "rgba(55, 65, 81, 0.5)"
                  : "",
              }}
              onClick={() => {
                setShowLogout(true);
              }}
            >
              <SlOptionsVertical
                onTouchStart={() => setOptionsAreActive(true)}
                onTouchEnd={() => setOptionsAreActive(false)}
                className="text-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <LogoutOverlay setShowLogout={setShowLogout} showLogout={showLogout} setShowWarningPopup={setShowWarningPopup}/>
      <WarningOverlay showOverlay={showWarningPopup} setShowOverlay={setShowWarningPopup} />
    </>
  );
}
