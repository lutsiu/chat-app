import styles from "./styles.module.scss";
import { useDispatch} from "react-redux";
import {

  setShowCreateGroupStep1,
  setShowCreateGroupStep2,
} from "../../../../state/ui";
import Contacts from "../../Contacts/GroupAddContactsElement";
export default function CreateGroupStep2() {
  const dispatch = useDispatch();

  return (
    <form
      className="absolute top-[50%] left-[50%] bg-gray-900 py-[1rem] rounded-xl 2xl:max-w-[35rem] z-[50]"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <p className="text-2xl font-medium pl-[2rem] pt-[0.5rem] mb-[1rem]">
        Add Members
      </p>
      <div className="max-h-[40rem] overflow-y-scroll">
        <Contacts />
      </div>
      <div className=" flex justify-end pr-[1rem] gap-[1rem] text-purple-500 text-xl font-medium">
        <button
          className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setShowCreateGroupStep2());
            dispatch(setShowCreateGroupStep1());
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} py-[0.5rem] px-[1rem] duration-200 rounded-lg`}
        >
          Next
        </button>
      </div>
    </form>
  );
}
