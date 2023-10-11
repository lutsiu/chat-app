import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { VscClose } from "react-icons/vsc";
import { useState, useEffect } from "react";
import Chevrons from "../Chevrons";
import Photo from "./Photo";

interface Props {
  showPhotos: boolean;
  setShowPhotos: (show: boolean) => void;
}
export default function DesktopUserPhotos(props: Props) {
  const { setShowPhotos, showPhotos } = props;
  const { user } = useSelector((state: ReduxState) => state.user);
  const [photos, setPhotos] = useState<string[]>([]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [photoIsHovered, setPhotoIsHovered] = useState(false);

  function reverseArray(arr: string[]) {
    const reversed: string[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }

  function scrollPhotoForward() {
    if (activePhoto !== photos.length) {
      setActivePhoto((prev) => prev + 1);
    }
    if (activePhoto === photos.length - 1) {
      setActivePhoto(0);
    }
  }

  function scrollPhotoBackwards() {
    if (activePhoto !== 0) {
      setActivePhoto((prev) => prev - 1);
    }
    if (activePhoto === 0) {
      setActivePhoto(photos.length - 1);
    }
  }
  function closePhotosOverlay(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("desktop-photos-overlay") ||
      target.classList.contains("desktop-photos-overlay-close")
    ) {
      console.log(e.target);
      setShowPhotos(false);
    }
  }

  useEffect(() => {
    if (user?.profilePictures && user?.profilePictures.length > 0) {
      const reversedPhotos = reverseArray(user?.profilePictures);
      setPhotos(reversedPhotos);
    }
  }, [user?.profilePictures]);
  return (
    <motion.div
      className="desktop-photos-overlay fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0, .7)" }}
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showPhotos ? 1 : 0,
        pointerEvents: showPhotos ? "auto" : "none",
      }}
      onClick={closePhotosOverlay}
    >
      <VscClose
        className="desktop-photos-overlay-close absolute right-[2rem] top-[2rem] w-[3rem] h-[3rem] text-gray-500 hover:text-white duration-200 cursor-pointer z-20"
        onClick={closePhotosOverlay}
      />
      <Chevrons photos={photos} scrollPhotoBackwards={scrollPhotoBackwards} scrollPhotoForward={scrollPhotoForward}/>
      <div
        className="flex w-full h-full ease-in-out duration-300"
        style={{ transform: `translateX(-${activePhoto * 100}%)` }}
      >
        {photos.map((photo, i) => (
          <Photo key={i} photo={photo}/>
        ))}
      </div>
    </motion.div>
  );
}
