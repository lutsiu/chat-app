import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGroupUsers } from "../../../../state/createGroup";
import { ReduxState } from "../../../../interfaces/redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactSocketData } from "../ContactsMainElement";
interface Props {
  contact: ContactSocketData
}
export default function ContactListItem(props: Props) {
  const {contact} = props;
  const dispatch = useDispatch();
  /* const { groupUsers } = useSelector((state: ReduxState) => state.createGroup);
  const [userIsInGroup, setUserIsInGroup] = useState(false);
  const user = {
    userName: "sasha",
    fullName: "Sanka",
  };
  const location = useLocation();

  useEffect(() => {
    if (groupUsers.some((user) => user === props.id)) {
      setUserIsInGroup(true);
    } else {
      setUserIsInGroup(false);
    }
  }, [groupUsers, props.id]); */

  return (
    <li
      className="2xl:w-[35rem] h-full "
    >
      <Link
        to={`/${contact.userName}`}
        className="w-full h-full flex gap-[1rem] hover:bg-slate-800 pl-[1.5rem] py-[0.4rem]"
      >
        <div>
          <div className="w-[4rem] h-[4rem] rounded-full relative">
            <img
              src={`http://localhost:3000/${contact.profilePicture}`}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between py-[0.2rem]">
          <div className="flex justify-between items-start ">
            <h2 className="text-xl font-medium">{contact.name}</h2>
          </div>
          <p className=" font-light text-lg text-zinc-400">
            last seen recently
          </p>
        </div>
      </Link>
    </li>
  );
}
