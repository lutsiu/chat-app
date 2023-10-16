import { IFile, IMessage } from "../../../../../../../interfaces/models";
import { useState, useEffect } from "react";
import spinner from "../../../../../../../assets/tail-spin.svg";
import SkeletonElement from "../../../../../../Widgets/Skeletons/SkeletonElement";
import { useDispatch } from "react-redux";
import {
  setShowContentContextMenu,
  setShowMediaOverlay,
} from "../../../../../../../state/chatUI";
import BACKEND_SERVER from "../../../../../../../utils/VARIABLES";
interface Props {
  media: IFile;
  message: IMessage;
}
export default function Content(props: Props) {
  const { media, message } = props;
  const [imageSrc, setImageSrc] = useState(spinner);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState('');
  const dispatch = useDispatch();

  function handleShowOverlay() {
    dispatch(setShowMediaOverlay({ message, showOverlay: true, file: media }));
  }

  const handleShowContextMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLLIElement;
    if (!target.closest(".content")) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    dispatch(
      setShowContentContextMenu({
        message,
        x,
        y,
        file: media,
        showMenu: true,
      })
    );
  };

  // for image
  useEffect(() => {
    if (!media.fileType.includes('image')) return;
    const image = new Image();
    image.src = `${BACKEND_SERVER}/${media.filePath}`;
    image.onload = () => {
      setIsLoading(false);
      setImageSrc(image.src);
    };
  }, [media.filePath, media.fileType]);

  // for video
  useEffect(() => {
    if (!media.fileType.includes('video')) return;
    const video = document.createElement("video");
    video.src = `${BACKEND_SERVER}/${media.filePath}`

    video.onloadedmetadata = () => {
      setIsLoading(false);
      setVideoSrc(video.src)
    };

    return () => {
      video.removeAttribute('src');
      video.load();
    }
  }, [media.filePath, media.fileType]);
  return (
    <>
      <li
        className="content h-[16rem] md:h-[12rem] cursor-pointer"
        onClick={handleShowOverlay}
        onContextMenu={handleShowContextMenu}
      >
        {media.fileType.includes("image") && !isLoading && (
          <img src={imageSrc} alt="img" className="object-cover h-full w-full" />
        )}
        {media.fileType.includes("image") || media.fileType.includes("video") && isLoading && (
          <SkeletonElement count={1} className="w-[13.3rem] h-[12rem]" />
        )}
        
        {media.fileType.includes("video") && !isLoading && (
          <video className="object-cover h-full w-full">
            <source
              src={videoSrc}
              type={media.fileType}
            />
          </video>
        )}
      </li>
    </>
  );
}
