import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from '../styles.module.scss';
interface Props {
  photos: string[],
  scrollPhotoBackwards: () => void;
  scrollPhotoForward: () => void
}
export default function Chevrons(props: Props) {
  const {photos, scrollPhotoBackwards, scrollPhotoForward} = props
  return (
    <>
      {photos.length > 1 && (
        <div className="absolute  w-full h-full top-0 flex justify-between z-10">
          <div
            className={`${styles.chevronParent} h-full w-[20%] flex items-center pl-[1rem] cursor-pointer`}
            onClick={scrollPhotoBackwards}
          >
            <BsChevronLeft
              className={`${styles.chevron} w-[4rem] h-[4rem] duration-300`}
            />
          </div>
          <div
            className={`${styles.chevronParent} h-full w-[20%] flex items-center justify-end pr-[1rem] cursor-pointer`}
            onClick={scrollPhotoForward}
          >
            <BsChevronRight
              className={`${styles.chevron} w-[4rem] h-[4rem] duration-300`}
            />
          </div>
        </div>
      )}
    </>
  );
}
