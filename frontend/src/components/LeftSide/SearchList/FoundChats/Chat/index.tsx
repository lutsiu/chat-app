import { Link } from "react-router-dom";
import styles from './styles.module.scss'
export default function Chat() {

  return (
    <Link to={`/${'greenday'}`} className={`${styles.chat} flex items-center gap-[1.3rem] px-[1rem] py-[.5rem] w-[97%] rounded-xl`}>
      <div className="w-[4rem] h-[4rem] rounded-full overflow-hidden">
        <img src="https://sklepotaku.pl/userdata/public/news/images/4.jpg" alt="avatar" className="w-full h-full " />
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-2xl font-medium">{'Fullname'}</span>
        <span className="text-lg font-medium text-gray-400">@{'Username'}</span>
      </div>
    </Link>
  )
}