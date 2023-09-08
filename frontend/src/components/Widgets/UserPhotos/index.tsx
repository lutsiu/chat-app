import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "./styles.module.scss";
export default function UserPhotos() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [photoIsHovered, setPhotoIsHovered] = useState(false);
  const photos = [
    "https://sklepotaku.pl/userdata/public/news/images/4.jpg",
    "https://otakusnotes.com/wp-content/uploads/2021/03/Dr.-Stone-Chapter-189-Spoilers-and-Release-Date.jpg",
    "https://thicc-af.mywaifulist.moe/waifus/gen-asagiri-dr-stone/2N6LMEOaWEICYGenxxLtaaSkvpmmn7mNwoYsw6xf.jpg?class=thumbnail",
  ];

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
      className="w-full h-[50rem] md:h-[42rem] relative flex "
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
              src={photo}
              loading="lazy"
              className="h-full object-cover block min-w-full max-w-full"
            />
          );
        })}
      </div>
      <div className="absolute bottom-[1rem] left-[1rem] flex flex-col gap-[0.2rem]">
        <span className="text-3xl font-medium">{`Username`}</span>
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
