import {  IMessage } from "../../../../../../interfaces/models";
import styles from "../../../Overlays/SendMedia/stylesSendMedia.module.scss";
import Content from "./MediaItem/Content";
interface Props {
  message: IMessage;
}
export default function Media(props: Props) {
  const { message } = props;
  const { media } = message;
  const mediaAmount = media.length;
  let mediaContainerClasses = `${styles["media-container-chat"]}`;
  let mediaClasses = `${styles.img}`;

  // styles for media container and images
  if (mediaAmount === 1) {
    mediaContainerClasses += ` ${styles["one-col"]}`;
    mediaClasses += ` ${styles["one-img"]}`;
  }
  if (mediaAmount === 2) {
    mediaContainerClasses += ` ${styles["two-cols"]}`;
    mediaClasses += ` ${styles["two-imgs-chat"]}`;
  }
  if (mediaAmount === 3) {
    mediaContainerClasses += ` ${styles["three-cols"]}`;
    mediaClasses += ` ${styles["three-imgs"]}`;
  }
  if (mediaAmount === 4) {
    mediaContainerClasses += ` ${styles["four-cols"]}`;
    mediaClasses += ` ${styles["four-imgs"]}`;
  }
  if (mediaAmount === 5) {
    mediaContainerClasses += ` ${styles["five-cols"]}`;
    mediaClasses += ` ${styles["five-imgs"]}`;
  }
  if (mediaAmount === 6) {
    mediaContainerClasses += ` ${styles["six-cols"]}`;
    mediaClasses += ` ${styles["six-imgs"]}`;
  }

  return (
    <>
      <div className={mediaContainerClasses}>
        {media.map((mediaItem, i) => {
          return (
            <Content
              key={i}
              mediaClasses={mediaClasses}
              mediaItem={mediaItem}
              message={message}
            />
          );
        })}
      </div>
    </>
  );
}
