import { IoMdClose } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditContactProfile } from "../../../../../../state/ui";
import { ReduxState } from "../../../../../../interfaces/redux";
import { useEffect, useState } from "react";
import { IContact } from "../../../../../../interfaces/models";

interface Props {
  setShowOverlay: (show: boolean) => void;
}

export default function MainHeader(props: Props) {
  const { setShowOverlay } = props;
  const { interlocutor } = useSelector((state: ReduxState) => state.chat);
  const [contact, setContact] = useState<undefined | IContact>(undefined);
  const { user } = useSelector((state: ReduxState) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.contacts && interlocutor) {
      const foundedContact = user?.contacts.find(
        (contact) => contact._id === interlocutor._id
      );
      setContact(foundedContact);
    }
  }, [interlocutor, user?.contacts]);
  return (
    <motion.div className="flex gap-[3rem]">
      <div onClick={() => setShowOverlay(false)}>
        <IoMdClose className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400" />
      </div>
      <div className="flex justify-between flex-1 items-center">
        <h4 className="text-3xl font-semibold">Profile</h4>
        {contact && (
          <BiPencil
            className="py-[0.7rem] rounded-full min-h-[3.7rem] min-w-[3.7rem] hover:bg-gray-700 duration-200 cursor-pointer text-gray-400"
            onClick={() => {
              setShowOverlay(false);
              dispatch(setShowEditContactProfile());
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
