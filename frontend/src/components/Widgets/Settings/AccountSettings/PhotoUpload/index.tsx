import { useDropzone } from "react-dropzone";
import { BsFillCameraFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
import ImagePreview from "../../MainSettings/UserInfo/ImagePreview";
import { useState } from "react";
interface Props {
  profileImage: null | Blob;
  setProfileImage: React.Dispatch<React.SetStateAction<Blob | null>>;
}

export default function PhotoUpload(props: Props) {
  const { profileImage, setProfileImage } = props;
  const { user } = useSelector((state: ReduxState) => state.user);
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

  return (
    <>
      <div className="w-[9rem] h-[9rem] rounded-full relative mx-auto">
        <img
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : `http://localhost:3000/${user?.profilePictures.at(-1)}`
          }
          alt="avatar"
          className="w-full h-full object-cover rounded-full"
        />
        <div
          {...getRootProps({
            className:
              "absolute bottom-[0rem] right-[-1rem]  p-[0.8rem] border-[2px] border-gray-900 rounded-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 duration-150 cursor-pointer",
          })}
        >
          <input {...getInputProps()} />
          <BsFillCameraFill className="text-2xl" />
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
