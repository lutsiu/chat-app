import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setGroupUsers } from "../../../../state/createGroup";
export default function GroupAddedUser(props: {id: string}) {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const { groupUsers } = useSelector((state: ReduxState) => state.createGroup);
  const dispatch = useDispatch();
  const [userIsInGroup, setUserIsInGroup] = useState(false);
  useEffect(() => {
    if (groupUsers.some((user) => user === props.id)) {
      setUserIsInGroup(true);
    } else {
      setUserIsInGroup(false);
    }
  }, [groupUsers, props.id]);
  return (
    <motion.li
      initial={{scale: 0, transformOrigin: 'center center'}}
      animate={{scale:  userIsInGroup ? '100%': '0' }}  
      className="flex items-center bg-gray-800 rounded-2xl gap-[0.6rem]"
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      <div className="relative">
        <img
          src="https://i.pinimg.com/originals/3b/23/4f/3b234f083ec5506204c4c4a5c593af5d.jpg"
          className="w-[3rem] h-[3rem] inline-block rounded-full"
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-full bg-purple-600 flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0, rotateZ: "180deg", scale: 0 }}
          animate={{
            opacity: showCloseButton ? 1 : 0,
            rotateZ: showCloseButton ? "0deg" : "180deg",
            scale: showCloseButton ? "100%" : 0,
          }}
          onClick={() => dispatch(setGroupUsers({userId: props.id}))}
        >
          <IoCloseOutline className="text-4xl" />
        </motion.div>
      </div>
      <p className="font-extralight text-lg pr-[1rem]">{"Username"}</p>
    </motion.li>
  );
}
