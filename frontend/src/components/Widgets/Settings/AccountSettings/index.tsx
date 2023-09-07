import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { PiUserCircleLight } from "react-icons/pi";
import { useState } from "react";
import Panel from "./Panel";
import PhotoUpload from "./PhotoUpload";
import ChangeFullname from "./ChangeFullname";
import { createPortal } from "react-dom";
import Overlay from "../Overlay";
import ChangeUsername from "./ChangeUsername";
export default function AccountSettings() {
  const { showMyAccountSettings } = useSelector(
    (state: ReduxState) => state.ui
  );
  const [showChangeFullnamePopup, setShowChangeFullnamePopup] = useState(false);
  const [showChangeUsernamePopup, setShowChangeUsernamePopup] = useState(false);
  const [profileImage, setProfileImage] = useState<null | Blob>(null);
  const dispatch = useDispatch();

  return (
    <>
      <motion.div
        className="absolute top-[5%] w-[36rem] md:left-[30%] lg:left-[35%] 2xl:left-[40%] bg-gray-900  pt-[1.5rem] rounded-3xl overflow-x-hidden flex flex-col gap-[1rem] z-[50]"
        initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
        animate={{
          opacity: showMyAccountSettings ? 1 : 0,
          x: showMyAccountSettings ? 0 : 100,
          pointerEvents: showMyAccountSettings ? "auto" : "none",
        }}
      >
        <Panel />
        <div>
          <PhotoUpload
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <div className="flex flex-col pt-[0.6rem] ">
            <span className="text-center text-2xl">{"Username"}</span>
            <span className="text-center text-purple-500 text-xl">
              {"Status"}
            </span>
          </div>
          <div className="w-full relative">
            <textarea
              className="w-full resize-none bg-transparent outline-none text-2xl mt-[2rem] pt-[0.5rem] h-[4rem] pl-[2rem] pr-[4rem]"
              placeholder="Bio"
              maxLength={50}
            ></textarea>
            <span className="absolute right-[2rem] top-[40.5%] text-gray-400 text-lg">
              50
            </span>
          </div>
          <div className="bg-gray-800 pt-[1rem] pl-[2rem] pb-[1.5rem] flex flex-col text-gray-400 text-xl">
            <span>Any details such as age, occupation or city</span>
            <span>Example: 23 y.o. designer from San Francisco</span>
          </div>
          <div className="flex flex-col pt-[0.6rem]">
            <div
              className="flex items-center justify-between pl-[1.6rem] pr-[2rem] py-[0.8rem] hover:bg-gray-800 cursor-pointer"
              onClick={() => setShowChangeFullnamePopup(true)}
            >
              <div className="flex items-center gap-[1.5rem]">
                <PiUserCircleLight className="text-4xl" />
                <span className="text-xl">Name</span>
              </div>
              <span className="text-purple-500 text-xl">{"Fullname"}</span>
            </div>
            <div className="flex items-center justify-between pl-[1.6rem] pr-[2rem] py-[0.8rem] hover:bg-gray-800 cursor-pointer">
              <div className="flex items-center gap-[1.5rem]">
                <AiOutlineMail className="text-4xl" />
                <span className="text-xl">Email</span>
              </div>
              <span className="text-purple-500 text-xl">
                {"username@gmail.com"}
              </span>
            </div>
            <div
              className="flex items-center justify-between pl-[1.6rem] pr-[2rem] py-[0.8rem] hover:bg-gray-800 cursor-pointer"
              onClick={() => setShowChangeUsernamePopup(true)}
            >
              <div className="flex items-center gap-[1.5rem]">
                <HiOutlineAtSymbol className="text-4xl" />
                <span className="text-xl">Username</span>
              </div>
              <span className="text-purple-500 text-xl">{"@username"}</span>
            </div>
          </div>
          <div className="bg-gray-800 mt-[0.5rem] pt-[1rem] pl-[2rem] pb-[1.5rem] flex flex-col text-gray-400 text-xl">
            Username lets people contact you on Telegram without needing your
            phone number
          </div>
        </div>
        <ChangeFullname
          showPopup={showChangeFullnamePopup}
          setShowPopup={setShowChangeFullnamePopup}
        />
        <ChangeUsername
          showPopup={showChangeUsernamePopup}
          setShowPopup={setShowChangeUsernamePopup}
        />
      </motion.div>
      {showChangeFullnamePopup &&
        createPortal(
          <Overlay
            setShowChangeFullnamePopup={setShowChangeFullnamePopup}
            setShowChangeUsernamePopup={setShowChangeUsernamePopup}
          />,
          document.getElementById("overlay") as HTMLElement
        )}
      {showChangeUsernamePopup &&
        createPortal(
          <Overlay
            setShowChangeFullnamePopup={setShowChangeFullnamePopup}
            setShowChangeUsernamePopup={setShowChangeUsernamePopup}
          />,
          document.getElementById("overlay") as HTMLElement
        )}
    </>
  );
}
