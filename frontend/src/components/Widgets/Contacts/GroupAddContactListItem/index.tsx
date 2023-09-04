import { FaCheck } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGroupUsers } from "../../../../state/createGroup";
import { ReduxState } from "../../../../interfaces/redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { mediumPurple } from "../../../../utils/colors";
export default function GroupAddContactListItem(props: { id: string }) {
  const dispatch = useDispatch();
  const { groupUsers } = useSelector((state: ReduxState) => state.createGroup);
  const [userIsInGroup, setUserIsInGroup] = useState(false);
  const user = {
    userName: "sasha",
    fullName: "Sanka",
  };
  const location = useLocation();
  const isActive = user.userName === location.pathname.slice(0, -1);
  
  useEffect(() => {
    if (groupUsers.some((user) => user === props.id)) {
      setUserIsInGroup(true);
    } else {
      setUserIsInGroup(false);
    }
  }, [groupUsers, props.id]);

  return (
    <li
      className="2xl:w-[35rem] h-full flex gap-[1rem] lg:gap-[2rem] hover:bg-slate-800 active:bg-slate-800 duration-200 pl-[1.5rem] py-[0.4rem]"
      onClick={() => dispatch(setGroupUsers({ userId: props.id }))}
    >
      <div className="">
        <motion.div
          className="w-[4rem] h-[4rem] rounded-full relative"
          animate={{
            padding: userIsInGroup ? "0.2rem" : "0",
            border: userIsInGroup ? `2px solid ${mediumPurple}` : "",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 13 }}
        >
          <img
            src="https://static1.srcdn.com/wordpress/wp-content/uploads/2019/09/Sasuke-Feature.jpg"
            alt="User's avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <motion.div
            className="absolute right-[-0.2rem] bottom-[-0.3rem] w-[2rem] h-[2rem] rounded-full bg-purple-500 flex items-center justify-center"
            initial={{ scale: 0, transformOrigin: 'center' }}
            animate={{scale: userIsInGroup ? '100%' : 0,}}
            transition={{ type: "spring", stiffness: 200, damping: 13 }}
          >
            <FaCheck className="text-white text-lg" />
          </motion.div>
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col justify-between py-[0.2rem]">
        <div className="flex justify-between items-start ">
          <h2 className="text-xl font-medium">{user.fullName}</h2>
        </div>
        <p className=" font-light text-lg text-zinc-400">last seen recently</p>
      </div>
    </li>
  );
}
