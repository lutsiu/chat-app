import { createPortal } from "react-dom";
import { IFile, IMessage } from "../../../../../../../interfaces/models";
import MediaOverlay from "../../../../../ChatBody/Overlays/MediaOverlay";
import { useState } from "react";
import ContentContextMenu from "../../ContentContextMenu";
interface Props {
  media: IFile;
  message: IMessage;
}
export default function Content(props: Props) {
  const { media,  message } = props;
  const [showOverlay, setShowOverlay] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);
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
          <video className="object-cover h-full w-full" >
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
        file={media}
      />, document.getElementById('overlay') as HTMLElement)}
      {createPortal(
        <MediaOverlay
          setShowOverlay={setShowOverlay}
          showOverlay={showOverlay}
          file={media}
          message={message}
        />,
        document.getElementById("overlay") as HTMLElement
      )}
    </>
  );
}
