import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillFile } from "react-icons/ai";
import { useRef } from "react";
import { useSocket } from "../../../../../context/SocketContext";
import getSizeOfFile from "../../../../../utils/getSizeOfFile";
import normalizeNameOfFile from "../../../../../utils/normalizeNameOfFile";
interface Props {
  showOverlay: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: null | File;
  chatId: string;
  userId: string;
}
export default function SendFile(props: Props) {
  const socket = useSocket();
  const { showOverlay, setFile, file, chatId, userId } = props;
  const formRef = useRef<null | HTMLFormElement>(null);
  const fileName = file?.name || "";
  const size = file?.size || 0;
  const sizeToShow = getSizeOfFile(size);
  const properFilename = normalizeNameOfFile(fileName);

  function handleCloseOverlay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("overlay") ||
      target.classList.contains("close-overlay")
    ) {
      setFile(null);
    }
  }
  function sendFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const dataToSend = {
        chatId,
        userId,
        message: formData.get("message"),
        file: {
          file,
          fileName,
          fileSize: size,
          type: file?.type,
        },
      };
      socket.emit("send-message-with-file", dataToSend);
    }
    setFile(null);
    formRef.current?.reset();
  }
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showOverlay ? 1 : 0,
        pointerEvents: showOverlay ? "auto" : "none",
      }}
      transition={{ duration: 0.1 }}
      className="overlay fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,.5)" }}
      onClick={handleCloseOverlay}
    >
      <motion.form
        initial={{ y: 100 }}
        animate={{
          y: showOverlay ? 0 : 100,
        }}
        className="flex flex-col gap-[1.5rem] p-[1rem] bg-slate-800 rounded-xl w-[40rem]"
        ref={formRef}
        onSubmit={sendFile}
      >
        <div className="flex items-center gap-[2rem]">
          <div onClick={handleCloseOverlay}>
            <IoCloseOutline className="close-overlay p-[0.4rem] min-h-[3rem] min-w-[3rem] hover:bg-slate-700 duration-200 rounded-full cursor-pointer" />
          </div>
          <span className="text-3xl font-medium">Send File</span>
        </div>
        <div className="flex gap-[0.4rem]">
          <div>
            <AiFillFile className="text-7xl text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-medium">{properFilename}</p>
            <p className="text-xl text-gray-300">{sizeToShow}</p>
          </div>
        </div>
        <div className="flex gap-[1rem]">
          <input
            type="text"
            name="message"
            placeholder="Add a caption..."
            className=" bg-transparent outline-none text-xl font-medium flex-1"
          />
          <button
            type="submit"
            className="p-[1rem] bg-purple-500  text-2xl font-medium rounded-2xl"
          >
            SEND
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
