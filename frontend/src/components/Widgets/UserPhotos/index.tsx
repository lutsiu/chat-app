import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "./styles.module.scss";
interface Props {
  photos: string[]
  userName: string
}
export default function UserPhotos(props: Props) {
  const {photos: pictures, userName} = props;

  // array.reverse() doens't work properly
  function reverseArray(arr: string[]) {
    const reversed: string[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }
  const photos = reverseArray(pictures);
  const [activePhoto, setActivePhoto] = useState(0);
  const [photoIsHovered, setPhotoIsHovered] = useState(false);

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
  return (
    <div
      className="w-full h-[50rem] md:h-[42rem] relative flex overflow-x-hidden"
      onMouseEnter={() => setPhotoIsHovered(true)}
      onMouseLeave={() => setPhotoIsHovered(false)}
      onTouchStart={() => setPhotoIsHovered(true)}
      onTouchEnd={() => setPhotoIsHovered(false)}
    >
      <div
        className="flex w-full h-full ease-in-out duration-300"
        style={{ transform: `translateX(-${activePhoto * 100}%)` }}
      >
        {photos.map((photo, i) => {
          return (
            <img
              key={i}
              src={`http://localhost:3000/${photo}`}
              loading="lazy"
              className="h-full object-cover block min-w-full max-w-full"
            />
          );
        })}
      </div>
      <div className="absolute bottom-[1rem] left-[1rem] flex flex-col gap-[0.2rem]">
        <span className="text-3xl font-medium">{userName}</span>
        <span className="text-xl font-medium text-gray-300">{`User status`}</span>
      </div>
      <div className="absolute  flex top-[0.6rem] w-full gap-[0.4rem] px-[0.5rem]">
        {photos.map((photo, i) => {
          return (
            <div
              key={i}
              className="h-[0.25rem]  rounded-lg duration-500 origin-left"
              style={{
                width: `${100 / photos.length}%`,
                backgroundColor:
                  i === activePhoto
                    ? "rgba(255, 255, 255,.6)"
                    : "rgba(107, 114, 128,.3)",
              }}
            ></div>
          );
        })}
      </div>
      {photos.length > 1 && photoIsHovered && (
        <div className="absolute  w-full h-full top-0 flex justify-between">
          <div
            className={`${styles.chevronParent} h-full w-[20%] flex items-center pl-[1rem] cursor-pointer`}
            onClick={scrollPhotoBackwards}
          >
            <BsChevronLeft
              className={`${styles.chevron} w-[4rem] h-[4rem] duration-300`}
            />
          </div>
          <div
            className={`${styles.chevronParent} h-full w-[20%] flex items-center justify-end pr-[1rem] cursor-pointer`}
            onClick={scrollPhotoForward}
          >
            <BsChevronRight
              className={`${styles.chevron} w-[4rem] h-[4rem] duration-300`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
