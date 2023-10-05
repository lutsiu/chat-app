import { IoCloseOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { BsFillCameraFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { hideEverything } from "../../../../../state/ui";

import InfoPopup from "./Popup";
import { ReduxState } from "../../../../../interfaces/redux";
import ImagePreview from "./ImagePreview";
export default function UserInfo() {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();

  const [setNewPhoto, setSetNewPhoto] = useState(false);
  const [profileImage, setProfileImage] = useState<null | Blob>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const onDrop = (acceptedFiles: Blob[]) => {
    setProfileImage(acceptedFiles[0]);
    setShowPreview(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  useEffect(() => {
    const handleClosePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".infoPopupItem") ||
        target.classList.contains("infoPopupItem")
      ) {
        console.log(target);
        console.log("yews");
        return;
      }
      setShowPopup(false);
    };
    document.addEventListener("mousedown", handleClosePopup);
  }, [showPopup]);

  return (
    <>
      <div className="px-[1.8rem] bg-gray-900 py-[1.5rem]">
        <div className="flex items-center gap-[22rem]">
          <h2 className="text-2xl font-medium text-zinc-100">Settings</h2>
          <div className="text-zinc-500 flex gap-[1.7rem] items-center">
            <div
              className="p-[1rem] flex justify-center items-center rounded-full  relative"
              style={{ backgroundColor: showPopup ? "rgb(31 41 55)" : "" }}
            >
              <HiDotsVertical
                className="text-3xl hover:text-zinc-100 duration-200 cursor-pointer"
                onClick={() => {
                  setShowPopup((prev) => !prev);
                }}
              />
              <motion.div
                className="fixed top-0 right-0 bottom-0 left-0 bg-transparent"
                animate={{
                  opacity: showPopup ? 1 : 0,
                  pointerEvents: showPopup ? "auto" : "none",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: showPopup ? "100%" : 0,
                    opacity: showPopup ? 1 : 0,
                  }}
                  className="absolute top-[8rem] right-[38%] bg-gray-900 pt-[0.6rem] origin-top-right z-20"
                >
                  <InfoPopup />
                </motion.div>
              </motion.div>
            </div>
            <IoCloseOutline
              className="text-4xl hover:text-zinc-100 duration-200 cursor-pointer"
              onClick={() => dispatch(hideEverything())}
            />
          </div>
        </div>
        <div className="flex gap-[1.8rem] mt-[2rem]">
          <div
            className="w-[6.5rem] h-[6.5rem] rounded-full relative overflow-y-hidden cursor-pointer"
            onMouseEnter={() => setSetNewPhoto(true)}
            onMouseLeave={() => setSetNewPhoto(false)}
          >
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : `http://localhost:3000/${user?.profilePictures.at(-1)}`
              }
              alt="User's avatar"
              className="w-full h-full rounded-full object-cover"
            />
            <motion.div
              {...getRootProps({
                className:
                  "flex items-center justify-center w-full py-[0.2rem] absolute bottom-[0]",
              })}
              style={{ background: "rgba(0,0,0,0.4)" }}
              initial={{ y: 20 }}
              animate={{ y: setNewPhoto ? 0 : 20 }}
              transition={{ damping: 14, duration: 0.15 }}
            >
              <input {...getInputProps()} />
              <BsFillCameraFill className="text-3xl" />
            </motion.div>
          </div>

          <div className="pt-[0.4rem] flex flex-col gap-[0.2rem]">
            <h3 className="text-2xl font-medium">{user?.fullName}</h3>
            <p className="text-xl">{user?.email}</p>
            <p className="text-gray-400 text-lg">@{user?.userName}</p>
          </div>
        </div>
      </div>
      <ImagePreview
        picture={profileImage}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
        setProfileImage={setProfileImage}
      />
    </>
  );
}
