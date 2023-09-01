import { useDropzone } from "react-dropzone";
import { BsFillCameraFill } from "react-icons/bs";
interface Props {
  profileImage: null | Blob
  setProfileImage: (img: Blob) => void
}

export default function PhotoUpload(props: Props) {
  const {profileImage, setProfileImage} = props;
  const onDrop = (acceptedFiles: Blob[]) => {
    setProfileImage(acceptedFiles[0]);
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
    <div className="w-[9rem] h-[9rem] rounded-full relative mx-auto">
      <img
        src={
          profileImage
            ? URL.createObjectURL(profileImage)
            : "https://sklepotaku.pl/userdata/public/news/images/4.jpg"
        }
        alt=""
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
  );
}
