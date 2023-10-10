import { IFile, IMessage } from "../../../../../../../interfaces/models";
import { useState, useEffect } from "react";
import spinner from "../../../../../../../assets/tail-spin.svg";
import SkeletonElement from "../../../../../../Widgets/SkeletonElement";
import { useDispatch } from "react-redux";
import {
  setShowContentContextMenu,
  setShowMediaOverlay,
} from "../../../../../../../state/chatUI";
interface Props {
  media: IFile;
  message: IMessage;
}
export default function Content(props: Props) {
  const { media, message } = props;
  const [src, setSrc] = useState(spinner);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const image = new Image();
    image.src = `http://localhost:3000/${media.filePath}`;
    image.onload = () => {
      setIsLoading(false);
      setSrc(image.src);
    };
  }, [media.filePath]);

  return (
    <>
      <li
        className="content h-[16rem] md:h-[12rem] cursor-pointer"
        onClick={handleShowOverlay}
        onContextMenu={handleShowContextMenu}
      >
        {media.fileType.includes("image") && !isLoading && (
          <img src={src} alt="img" className="object-cover h-full w-full" />
        )}
        {media.fileType.includes("image") && isLoading && (
          <SkeletonElement count={1} className="w-[13.3rem] h-[12rem]" />
        )}
        {media.fileType.includes("video") && (
          <video className="object-cover h-full w-full">
            <source
              src={`http://localhost:3000/${media.filePath}`}
              type={media.fileType}
            />
          </video>
        )}
      </li>
    </>
  );
}
