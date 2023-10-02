import { Link } from "react-router-dom";
import styles from './styles.module.scss'
export default function Person() {

  return (
    <Link to={`/${'greenday'}`} className={`${styles.person} p-[1rem] rounded-xl`}>
      <div className="w-[5.5rem] h-[5.5rem] overflow-hidden rounded-full">
        <img src="https://sklepotaku.pl/userdata/public/news/images/4.jpg" alt="avatar" className="w-full h-full" />
      </div>
      <span className="mt-[.2rem] inline-block font-medium">{'Greenday'}</span>
    </Link>
  )
}