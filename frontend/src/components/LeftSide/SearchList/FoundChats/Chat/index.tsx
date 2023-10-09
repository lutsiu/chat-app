import { Link } from "react-router-dom";
import styles from './styles.module.scss'

interface Props { 
  profileImage: string,
  userName: string, 
  fullName: string
}
export default function Chat(props :Props) {
  const {profileImage, userName, fullName} = props;
  return (
    <Link to={`/${userName}`} className={`${styles.chat} flex items-center gap-[1.3rem] px-[1rem] py-[.5rem] w-[97%] rounded-xl`}>
      <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden">
        <img src={`http://localhost:3000/${profileImage}`} alt="avatar" className="w-full h-full " />
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-2xl font-medium">{fullName}</span>
        <span className="text-lg font-medium text-gray-400">@{userName}</span>
      </div>
    </Link>
  )
}