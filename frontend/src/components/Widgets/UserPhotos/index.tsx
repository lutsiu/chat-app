import { useEffect, useState } from "react";


import Photo from "./Photo";
import Chevrons from "./Chevrons";

interface Props {
  photos: string[] | undefined;
  userName: string | undefined;
}

export default function UserPhotos(props: Props) {
  const { photos: pictures, userName } = props;
  const [photos, setPhotos] = useState<string[]>([]);
  const [activePhoto, setActivePhoto] = useState(0);
/*   const [photoIsHovered, setPhotoIsHovered] = useState(false); */

 
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

  useEffect(() => {
    if (pictures && pictures.length > 0) {
      const reversedPhotos = reverseArray(pictures);
      setPhotos(reversedPhotos);
    }
  }, [pictures]);

  return (
    <div
      className="w-full h-[50rem] md:h-[42rem] relative flex overflow-x-hidden"
/*       onMouseEnter={() => setPhotoIsHovered(true)}
      onMouseLeave={() => setPhotoIsHovered(false)}
      onTouchStart={() => setPhotoIsHovered(true)}
      onTouchEnd={() => setPhotoIsHovered(false)} */
    >
      <div
        className="flex w-full h-full ease-in-out duration-300"
        style={{ transform: `translateX(-${activePhoto * 100}%)` }}
      >
        {photos.map((photo, i) => (
          <Photo key={i} photo={photo} />
        ))}
      </div>

      <div className="absolute bottom-[1rem] left-[1rem] flex flex-col gap-[0.2rem]">
        <span className="text-3xl font-medium">{userName}</span>
      </div>
      <div className="absolute  flex top-[0.6rem] w-full gap-[0.4rem] px-[0.5rem]">
        {photos.map((_, i) => (
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
        ))}
      </div>
      <Chevrons photos={photos} scrollPhotoBackwards={scrollPhotoBackwards} scrollPhotoForward={scrollPhotoForward}/>
    </div>
  );
}
