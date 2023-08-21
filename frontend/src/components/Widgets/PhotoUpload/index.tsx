import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RiImageAddFill } from "react-icons/ri";
import { mediumPurple } from "../../../utils/colors";
interface Props {
  image: null | Blob;
  setImage: (img: null | Blob) => void;
}

export default function PhotoUpload(props: Props) {
  const { image, setImage } = props;
  const onDrop = useCallback(
    (acceptedImage: Blob[]) => {
      const img = acceptedImage[0];
      setImage(img);
      // set image
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
            "w-[6.5rem] h-[6.5rem] flex justify-center items-center rounded-full bg-zinc-800 duration-300 hover:bg-zinc-700 cursor-pointer",
        })}
        style={{ border: isDragActive ? `dashed 0.3rem ${mediumPurple}` : "" }}
      >
        {!image && <RiImageAddFill className="text-3xl" />}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            className="w-full h-full rounded-full object-cover"
          />
        )}
        <input {...getInputProps()} />
      </div>
    </>
  );
}
