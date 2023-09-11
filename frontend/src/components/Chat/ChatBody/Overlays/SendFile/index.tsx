import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillFile } from "react-icons/ai";
interface Props {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  fileName: string,
  size: number
}
export default function SendFile(props: Props) {
  const { showOverlay, setShowOverlay, fileName, size } = props;

  const indexOfLastDot = fileName.lastIndexOf('.');

  const properFilename = fileName.length >= 40 ? fileName.slice(0, 20) + '...' + fileName.slice(indexOfLastDot, -1) : fileName; 

  function handleCloseOverlay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("overlay") || target.classList.contains('close-overlay')) {
      setShowOverlay(false);
    }
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
            <p className="text-xl text-gray-300">{(size / 1000000).toFixed(2)}MB</p>
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
