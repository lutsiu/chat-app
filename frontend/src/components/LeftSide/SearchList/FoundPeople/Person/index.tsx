import { Link } from 'react-router-dom';
import styles from './styles.module.scss'
export default function Person() {
  return (
    <Link to={`/${'greenday'}`} className={`${styles.person} person flex gap-[.6rem] items-center rounded-2xl `}>
      <div className="relative w-[3rem] h-[3rem] rounded-full overflow-hidden">
        <img
          src="https://sklepotaku.pl/userdata/public/news/images/4.jpg"
          alt='avatar'
          className="w-full h-full "
        />
      </div>
      <p className="font-extralight text-lg pr-[1rem] ">{"Username"}</p>
    </Link>
  );
}
