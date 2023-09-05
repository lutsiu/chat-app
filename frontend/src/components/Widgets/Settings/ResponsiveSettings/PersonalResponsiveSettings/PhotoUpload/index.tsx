import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";
interface Props {
  image: null | Blob;
  setImage: (img: null | Blob) => void;
}

export default function PhotoUpload(props: Props) {
  const { image, setImage } = props;
  const [isActive, setIsActive] = useState(false);
  const onDrop = useCallback(
    (acceptedImage: Blob[]) => {
      const img = acceptedImage[0];
      setImage(img);
      // set image
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            "w-[8.5rem] h-[8.5rem] flex justify-center items-center rounded-full bg-black relative",
        })}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
      >
        {!image && (
          <BiSolidCamera
            className="duration-300"
            style={{
              width: isActive ? "4.5rem" : "3.5rem",
              height: isActive ? "4.5rem" : "3.5rem",
            }}
          />
        )}
        {image && (
          <>
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute w-full h-full flex items-center rounded-full justify-center" style={{background: 'rgba(0,0,0,.3)'}}>
              <BiSolidCamera
                className="duration-300"
                style={{
                  width: isActive ? "4.5rem" : "3.5rem",
                  height: isActive ? "4.5rem" : "3.5rem",
                }}
              />
            </div>
          </>
        )}
        <input {...getInputProps()} />
      </div>
    </>
  );
}
