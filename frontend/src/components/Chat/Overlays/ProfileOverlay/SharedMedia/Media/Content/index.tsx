import { createPortal } from "react-dom";
import { IFile, IMessage } from "../../../../../../../interfaces/models";
import MediaOverlay from "../../../../../ChatBody/Overlays/MediaOverlay";
import { useState, useEffect } from "react";
import ContentContextMenu from "../../ContentContextMenu";
import tailSpin from '../../../../../../../assets/tail-spin.svg'
interface Props {
  media: IFile;
  chatId: string;
  message: IMessage;
}
export default function Content(props: Props) {
  const { media, chatId, message } = props;
  const [showOverlay, setShowOverlay] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  function handleShowOverlay() {
    setShowOverlay((prev) => !prev);
  }
  const handleShowContextMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLLIElement;
    if (!target.closest(".content")) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenuX(x);
    setContextMenuY(y);
    setShowContextMenu(true);
  };
  

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const image = new Image();
    image.src = `http://localhost:3000/${media.filePath}`;
    image.onload = handleLoad;
    image.onerror = handleLoad; // Handle error as well, for example, if the image fails to load
  }, [media.filePath]);

  return (
    <>
      <li
        className="content h-[16rem] md:h-[12rem] cursor-pointer"
        onClick={handleShowOverlay}
        onContextMenu={handleShowContextMenu}
      >
        {media.fileType.includes("image") && (
          <img
            src={`http://localhost:3000/${media.filePath}`}
            alt="img"
            className="object-cover h-full w-full"
          />
        )}
        {media.fileType.includes('video') && (
          <video className="object-cover h-full w-full">
            <source src={`http://localhost:3000/${media.filePath}`} type={media.fileType} />
          </video>
        )}
      </li>
      {createPortal(<ContentContextMenu
        x={contextMenuX}
        y={contextMenuY}
        setShowMenu={setShowContextMenu}
        showMenu={showContextMenu}
        message={message}
        chatId={chatId}
        file={media}
      />, document.getElementById('overlay') as HTMLElement)}
      {createPortal(
        <MediaOverlay
          setShowOverlay={setShowOverlay}
          showOverlay={showOverlay}
          file={media}
          chatId={chatId}
          message={message}
        />,
        document.getElementById("overlay") as HTMLElement
      )}
    </>
  );
}
