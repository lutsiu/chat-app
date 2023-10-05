import { IFile, IMessage } from "../../../../../../interfaces/models";
import styles from "../../../Overlays/SendMedia/stylesSendMedia.module.scss";

import { createPortal } from "react-dom";
import MediaOverlay from "../../../Overlays/MediaOverlay";
import { useState } from "react";

interface Props {
  chatId: string;
  message: IMessage;
}
export default function Media(props: Props) {
  const [mediaForOverlay, setMediaForOverlay] = useState<null | IFile>(null);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);
  const { chatId, message } = props;
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

  function handleShowMedia(media: IFile) {
    setMediaForOverlay(media);
    setShowMediaOverlay(true);
  }
  return (
    <>
      <div className={mediaContainerClasses}>
        {media.map((mediaItem, i) => {
          if (!mediaItem.fileType.includes("video")) {
            return (
              <img
                key={i}
                src={`http://localhost:3000/${mediaItem.filePath}`}
                className={mediaClasses}
                loading="lazy"
                onClick={handleShowMedia.bind(null, mediaItem)}
              />
            );
          } else
            return (
              <video
                key={i}
                className={mediaClasses}
                controls
                autoPlay
                onClick={() => setMediaForOverlay(mediaItem)}
              >
                <source
                  src={`http://localhost:3000/${mediaItem.filePath}`}
                  type={mediaItem.fileType}
                />
              </video>
            );
        })}
      </div>
      {mediaForOverlay &&
        createPortal(
          <MediaOverlay
            message={message}
            setShowOverlay={setShowMediaOverlay}
            showOverlay={showMediaOverlay}
            chatId={chatId}
            file={mediaForOverlay}
          />,
          document.getElementById("overlay") as HTMLElement
        )}
    </>
  );
}
