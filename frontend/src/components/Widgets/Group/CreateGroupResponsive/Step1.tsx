
import { useDispatch, useSelector } from "react-redux";
import {
  hideEverything,
  setShowCreateGroupStep1,
  setShowCreateGroupStep2,
} from "../../../../state/ui";
import Contacts from "../../Contacts/GroupAddContactsElement";
import { motion } from "framer-motion";
import { ReduxState } from "../../../../interfaces/redux";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { FormEvent, useState } from "react";
import MobileStickyButton from "../../Buttons/MobileStickyButton";
export default function ResponsiveCreateGroupStep1() {
  const dispatch = useDispatch();
  const { ui } = useSelector((state: ReduxState) => state);
  const [leftArrowIsActive, setLeftArrowIsActive] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setShowCreateGroupStep1());
    dispatch(setShowCreateGroupStep2());
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="fixed top-0 bottom-0 w-full h-full bg-gray-900  rounded-xl 2xl:max-w-[35rem]"
      initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
      animate={{
        opacity: ui.showCreateGroupStep1 ? 1 : 0,
        x: ui.showCreateGroupStep1 ? 0 : 100,
        pointerEvents: ui.showCreateGroupStep1 ? "auto" : "none",
      }}
    >
      <div className="flex pl-[1.3rem] py-[0.5rem] gap-[1.5rem]  mb-[1rem] items-center bg-gray-800">
        <div
          className="p-[0.7rem] rounded-full"
          style={{
            backgroundColor: leftArrowIsActive ? "rgba(55, 65, 81, 0.5)" : "",
          }}
        >
          <HiMiniArrowLeft
            className="text-4xl"
            onTouchStart={() => setLeftArrowIsActive(true)}
            onTouchEnd={() => setLeftArrowIsActive(false)}
            onClick={() => {
              dispatch(hideEverything())
            }}
          />
        </div>
        <div className="flex flex-col gap-[0.3rem]">
          <span className="text-xl font-semibold tracking-wide">New group</span>
          <span className="text-gray-400 text-lg">Add up to 10000 members</span>
        </div>
      </div>
      <div className="max-h-full overflow-y-scroll">
        <Contacts />
      </div>
      <div className="fixed bottom-[6rem] right-[6rem]">
        <MobileStickyButton type="submit">
          <HiMiniArrowRight className="text-4xl" />
        </MobileStickyButton>
      </div>
    </motion.form>
  );
}
