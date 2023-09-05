import Contacts from "../ContactsMainElement";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ReduxState } from "../../../../interfaces/redux";
import { setShowContacts, setShowCreateContact } from "../../../../state/ui";

import MobileStickyButton from "../../Buttons/MobileStickyButton";
import { FaUserPlus } from "react-icons/fa";
import Header from "./Header";
import CreateContactResponsive from "./CreateContactResponsive";
export default function ContactsResponsive() {
  const dispatch = useDispatch();
  const { showContacts } = useSelector((state: ReduxState) => state.ui);
  const [sortDescending, setSortDescending] = useState(true);
  const { ui } = useSelector((state: ReduxState) => state);
  const [inputValue, setInputValue] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <>
      <motion.form
        /* onSubmit={} */
        className="fixed top-0 bottom-0 w-full h-full bg-gray-900  rounded-xl "
        initial={{ opacity: 0, x: 100, pointerEvents: "none" }}
        animate={{
          opacity: showContacts ? 1 : 0,
          x: showContacts ? 0 : 100,
          pointerEvents: showContacts ? "auto" : "none",
        }}
        transition={{duration: 0.3, ease: 'easeOut'}}
      >
        <Header
          sort={{ sortDescending, setSortDescending }}
          searchBar={{
            setShowSearchBar,
            showSearchBar,
            inputValue,
            setInputValue,
          }}
        />

        <div className="max-h-full overflow-y-scroll">
          <Contacts />
        </div>

        <div className="fixed bottom-[6rem] right-[6rem]">
          <MobileStickyButton
            type="button"
            onClick={() => dispatch(setShowCreateContact())}
          >
            <FaUserPlus className="text-4xl" />
          </MobileStickyButton>
        </div>
      </motion.form>
      <motion.div
          animate={{ display: ui.showCreateContact ? 'block' : 'none' }}
          className="create-contact-overlay absolute top-0 bottom-0 left-0 right-0"
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('create-contact-overlay')) {
              dispatch(setShowCreateContact())
            } else {
              return
            }
          }}
        >
          <CreateContactResponsive />
        </motion.div>
    </>
  );
}
