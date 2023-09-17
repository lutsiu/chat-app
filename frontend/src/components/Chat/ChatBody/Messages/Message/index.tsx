import { IMessage } from "../../../../../interfaces/models";
import { useState } from "react";
import MessageContextMenu from "../ContextMenu";
interface Props {
  msg: IMessage;
  myUserId: string | undefined;
  chatId :string
}

export default function Message(props: Props) {
  const { msg, myUserId, chatId } = props;
  const { message, timeStamp, file, images, videos, sender } = msg;
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const handleShowContextMenu = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const target = e.target as HTMLLIElement;
    if (!target.closest(".message")) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    setContextMenuX(x);
    setContextMenuY(y);
    setShowContextMenu(true);
  };
  return (
    <>
      {myUserId === sender && (
        <>
          <li
            className="message relative bg-purple-500 justify-self-end rounded-2xl p-[0.8rem] pr-[4rem] max-w-[70%]"
            onContextMenu={handleShowContextMenu}
          >
            <p className="text-xl font-medium">{message}</p>
            <span className="absolute bottom-[0.7rem] right-[0.7rem]">{`${new Date(
              timeStamp
            ).getHours()}: ${
              new Date(timeStamp).getMinutes() < 10
                ? `0${new Date(timeStamp).getMinutes()}`
                : new Date(timeStamp).getMinutes()
            }`}</span>
          </li>
          <MessageContextMenu
            x={contextMenuX}
            y={contextMenuY}
            showMenu={showContextMenu}
            setShowMenu={setShowContextMenu}
            editable={true}
            msg={msg}
            chatId={chatId}
          />
        </>
      )}
      {myUserId !== sender && (
        <>
          <li
            className="message relative bg-gray-700 justify-self-start rounded-2xl p-[0.8rem] max-w-[70%] pr-[4rem]"
            onContextMenu={handleShowContextMenu}
          >
            <p className="text-xl font-medium">{message}</p>
            <span className="absolute bottom-[0.7rem] right-[0.7rem]">{`${new Date(
              timeStamp
            ).getHours()}: ${
              new Date(timeStamp).getMinutes() < 10
                ? `0${new Date(timeStamp).getMinutes()}`
                : new Date(timeStamp).getMinutes()
            }`}</span>
          </li>
            <MessageContextMenu
              x={contextMenuX}
              y={contextMenuY}
              showMenu={showContextMenu}
              setShowMenu={setShowContextMenu}
              editable={false}
              msg={msg}
              chatId={chatId}
            />
        </>
      )}
    </>
  );
}
