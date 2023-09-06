import { IoMdClose } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { motion } from "framer-motion";

interface Props {
  showHeader: boolean
}

export default function MainHeader(props: Props) {
  const {showHeader} = props;
  return (
    <motion.div className="flex gap-[3rem]" animate={{x: showHeader ? 0 : 100, opacity: showHeader ? 1 : 0}}>
      <div>
        <IoMdClose className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400" />
      </div>
      <div className="flex justify-between flex-1 items-center">
        <h4 className="text-3xl font-semibold">Profile</h4>
        <BiPencil className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400" />
      </div>
    </motion.div>
  );
}
