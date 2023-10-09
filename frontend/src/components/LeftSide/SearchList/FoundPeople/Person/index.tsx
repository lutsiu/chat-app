import { Link } from 'react-router-dom';
import styles from './styles.module.scss'
interface Props {
  profilePicture: string,
  userName: string,
  fullName: string
}
export default function Person(props: Props) {
  const {profilePicture, userName, fullName} = props;
  return (
    <Link to={`/${userName}`} className={`${styles.person} person flex gap-[.6rem] items-center rounded-2xl `}>
      <div className="relative w-[3rem] h-[3rem] rounded-full overflow-hidden">
        <img
          src={`http://localhost:3000/${profilePicture}`}
          alt='avatar'
          className="w-full h-full "
        />
      </div>
      <p className="font-extralight text-lg pr-[1rem] ">{fullName}</p>
    </Link>
  );
}
