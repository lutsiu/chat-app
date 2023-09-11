import { useDropzone } from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";
import { HiDocument } from "react-icons/hi";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowWarningPopup } from "../../../../../state/ui";
interface Props {
  setFile: (file: File) => void;
  setMedia: (media: Blob[]) => void;
  showPopup: boolean;
}
export default function SendFilesPopup(props: Props) {
  const { showPopup, setFile, setMedia } = props;
  const dispatch = useDispatch();
  const MAX_SIZE = 10000000; // 10 mb
  // media

  const onDropMedia = (acceptedFiles: Blob[]) => {
    console.log(acceptedFiles);
    setMedia(acceptedFiles);
  };

  const {
    getRootProps: getMediaRootProps,
    getInputProps: getMediaInputProps,
    fileRejections: mediaRejections,
  } = useDropzone({
    onDrop: onDropMedia,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "video/mp4": [".mp4"],
    },
    maxFiles: 6,
    maxSize: MAX_SIZE,
  });

  // files

  const onDropFile = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const {
    getRootProps: getFileRootProps,
    getInputProps: getFileInputProps,
    fileRejections,
  } = useDropzone({
    onDrop: onDropFile,
    maxFiles: 1,
    maxSize: MAX_SIZE,
  });

  useEffect(() => {
    if (fileRejections.length !== 0 || mediaRejections.length !== 0) {
      console.log(fileRejections, mediaRejections)
      dispatch(setShowWarningPopup());
      setTimeout(() => {
        dispatch(setShowWarningPopup());
      }, 3000);
    }
  }, [fileRejections, mediaRejections, dispatch]);

  return (
    <motion.div
      initial={{ transform: "scale(0)" }}
      animate={{ transform: showPopup ? "scale(100%)" : "scale(0)" }}
      transition={{ duration: 0.1 }}
      className="files-popup absolute bg-slate-700 top-[-10rem] right-[-1.3rem] rounded-2xl overflow-hidden w-[18rem] origin-bottom-right"
    >
      <div
        {...getMediaRootProps({
          className:
            "flex items-center gap-[1.5rem] pl-[1.5rem] pr-[2.8rem] hover:bg-slate-800 cursor-pointer py-[1rem]",
        })}
      >
        <AiFillPicture className="text-3xl" />
        <span className="text-xl font-semibold">Photo or video</span>
        <input {...getMediaInputProps()} />
      </div>
      <div
        {...getFileRootProps({
          className:
            "flex items-center gap-[1.5rem] pl-[1.5rem] pr-[2.8rem] hover:bg-slate-800 cursor-pointer py-[1rem]",
        })}
      >
        <HiDocument className="text-3xl" />
        <span className="text-xl font-semibold">Document</span>
        <input {...getFileInputProps()} />
      </div>
    </motion.div>
  );
}
