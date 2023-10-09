import { AiFillFile } from "react-icons/ai";
import { IFile, IMessage } from "../../../../../../../interfaces/models";
import normalizeDateName from "../../../../../../../utils/normalizeDateName";
import getSizeOfFile from "../../../../../../../utils/getSizeOfFile";
import { createPortal } from "react-dom";
import ContentContextMenu from "../../ContentContextMenu";
import { useState } from "react";
interface Props {
  file: IFile;
  message: IMessage;
}
export default function Content(props: Props) {
  const { file, message } = props;
  const dateToShow = normalizeDateName(message.timeStamp);
  const fileSize = getSizeOfFile(file.fileSize);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleShowContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
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
      <div
        className="content flex items-center gap-[0.6rem] p-[1rem] cursor-pointer"
        onContextMenu={handleShowContextMenu}
      >
        <div>
          <AiFillFile className="text-6xl text-violet-500" />
        </div>
        <div>
          <h5 className="text-white text-xl font-medium">{file.fileName}</h5>
          <div className="text-gray-300 text-xl flex gap-[0.4rem]">
            <span>{fileSize}</span>
            <span>·</span>
            <span>{dateToShow}</span>
          </div>
        </div>
      </div>
      {createPortal(
        <ContentContextMenu
          x={contextMenuX}
          y={contextMenuY}
          setShowMenu={setShowContextMenu}
          showMenu={showContextMenu}
          message={message}
          file={file}
        />,
        document.getElementById("overlay") as HTMLElement
      )}
    </>
  );
}
