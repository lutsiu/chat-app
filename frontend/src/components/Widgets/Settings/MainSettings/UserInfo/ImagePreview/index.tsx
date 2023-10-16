import { motion } from "framer-motion";
import { MdDone } from "react-icons/md";
import { useSocket } from "../../../../../../context/SocketContext";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../../interfaces/redux";
interface Props {
  picture: Blob | null;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  setProfileImage: React.Dispatch<React.SetStateAction<Blob | null>>
}
export default function ImagePreview(props: Props) {
  const { picture, setShowPreview, showPreview, setProfileImage } = props;
  const {user} = useSelector((state: ReduxState) => state.user);
  const socket = useSocket();
  function closePopup() {
    setShowPreview(false);
    setProfileImage(null);
  }
  function saveImage() {
    if (!picture) return
    socket.emit('change-profile-picture', {userId: user?._id, picture: {file: picture, fileName: picture.name}})
    closePopup()
  }
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showPreview ? 1 : 0,
        pointerEvents: showPreview ? "auto" : "none",
      }}
      className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,.8)" }}
      onClick={closePopup}
    >
      <div className="w-[40rem] h-[80vh]">
        <img
          src={picture ? URL.createObjectURL(picture) : ""}
          alt="picture"
          className="w-full h-full object-cover"
        />
      </div>
      <button className="absolute right-[10rem] bottom-[4rem] bg-purple-500 p-[1rem] rounded-full hover:bg-purple-600 duration-150" onClick={saveImage}>
        <MdDone className="w-[3rem] h-[3rem]" />
      </button>
    </motion.div>
  );
}
