import { IoMdClose } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditContactProfile } from "../../../../../../state/ui";
import { UserModel } from "../../../../../../interfaces/models";
import { ReduxState } from "../../../../../../interfaces/redux";

interface Props {
  setShowOverlay: (show: boolean) => void;
  interlocutor: UserModel
}

export default function MainHeader(props: Props) {
  const { setShowOverlay, interlocutor } = props;
  const {user} = useSelector((state: ReduxState) => state.user);
  const isContact = user?.contacts.find(contact => contact._id === interlocutor._id);
  const dispatch = useDispatch();
  return (
    <motion.div className="flex gap-[3rem]">
      <div onClick={() => setShowOverlay(false)}>
        <IoMdClose className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400" />
      </div>
      <div className="flex justify-between flex-1 items-center">
        <h4 className="text-3xl font-semibold">Profile</h4>
        {isContact && <BiPencil
          className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400"
          onClick={() => {
            setShowOverlay(false);
            dispatch(setShowEditContactProfile());
          }}
        />}
      </div>
    </motion.div>
  );
}
