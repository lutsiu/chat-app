import { useDispatch } from "react-redux";
import { IFile, IMessage } from "../../../../../../../../interfaces/models";
import { setShowMediaOverlay } from "../../../../../../../../state/chatUI";
import { useState, useEffect} from "react";
import spinner from '../../../../../../../../assets/tail-spin.svg'
import SkeletonElement from "../../../../../../../Widgets/Skeletons/SkeletonElement";
import BACKEND_SERVER from "../../../../../../../../utils/VARIABLES";
interface Props {
  mediaItem: IFile;
  mediaClasses: string;
  message: IMessage;
}
export default function Content(props: Props) {
  const { mediaItem, mediaClasses, message } = props;
  const [imageSrc, setImageSrc] = useState(spinner);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState('');
  const dispatch = useDispatch();


  function handleShowMedia(media: IFile) {
    dispatch(setShowMediaOverlay({ file: media, message, showOverlay: true }));
  }

  // for image
  useEffect(() => {
    if (mediaItem.fileType.includes('video')) return;
    const image = new Image();
    image.src = `${BACKEND_SERVER}/${mediaItem.filePath}`;
    image.onload = () => {
      setIsLoading(false);
      setImageSrc(image.src);
    };
  }, [mediaItem.filePath, mediaItem.fileType]);

  // for video
  useEffect(() => {
    if (!mediaItem.fileType.includes('video')) return;
    const video = document.createElement("video");
    video.src = `${BACKEND_SERVER}/${mediaItem.filePath}`

    video.onloadedmetadata = () => {
      setIsLoading(false);
      setVideoSrc(video.src)
    };

    return () => {
      video.removeAttribute('src');
      video.load();
    }
  }, [mediaItem.filePath, mediaItem.fileType]);

  return (
    <>
      {!mediaItem.fileType.includes("video") && !isLoading && (
        <img
          src={imageSrc}
          className={mediaClasses}
          loading="lazy"
          onClick={handleShowMedia.bind(null, mediaItem)}
        />
      )}
      {isLoading && <SkeletonElement count={1} className={mediaClasses}/>}
      {mediaItem.fileType.includes("video") && !isLoading && (
        <video className={mediaClasses} controls autoPlay>
          <source
            src={videoSrc}
            type={mediaItem.fileType}
          />
        </video>
      )}
    </>
  );
}
