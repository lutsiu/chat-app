import { useCallback,  useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidCamera } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../../interfaces/redux";
import BACKEND_SERVER from "../../../../../../utils/VARIABLES";
interface Props {
  image: null | File;
  setImage: (img: null | File) => void;
}

export default function PhotoUpload(props: Props) {
  const { image, setImage } = props;
  const {user} = useSelector((state: ReduxState) => state.user);
  const [isActive, setIsActive] = useState(false);
  const onDrop = useCallback(
    (acceptedImage: File[]) => {
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
        <>
          <img
            src={image ? URL.createObjectURL(image) : `${BACKEND_SERVER}/${user?.profilePictures.at(-1) as string}`}
            className="w-full h-full rounded-full object-cover"
          />
          <div
            className="absolute w-full h-full flex items-center rounded-full justify-center"
            style={{ background: "rgba(0,0,0,.3)" }}
          >
            <BiSolidCamera
              className="duration-300"
              style={{
                width: isActive ? "4.5rem" : "3.5rem",
                height: isActive ? "4.5rem" : "3.5rem",
              }}
            />
          </div>
        </>

        <input {...getInputProps()} />
      </div>
    </>
  );
}
