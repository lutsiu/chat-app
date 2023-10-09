import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface Props {
  userName: string;
  profilePicture: string;
  fullName: string;
}
export default function Person(props: Props) {
  const { userName, profilePicture, fullName } = props;
  return (
    <Link
      to={`/${userName}`}
      className={`${styles.person} p-[1rem] rounded-xl`}
    >
      <div className="person w-[5.5rem] h-[5.5rem] overflow-hidden rounded-full">
        <img
          src={`http://localhost:3000/${profilePicture}`}
          alt="avatar"
          className="w-full h-full"
        />
      </div>
      <span className="mt-[.2rem] inline-block font-medium">{fullName}</span>
    </Link>
  );
}
