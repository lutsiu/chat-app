import Media from "./Media";
import Groups from "./Groups";
import Files from "./Files";
import { useState, useEffect } from "react";
import { IMessage } from "../../../../../interfaces/models";
interface Props {
  showMedia: boolean;
  showFiles: boolean;
  showGroups: boolean;
  chatMessages: IMessage[]
  chatId:string
}

export default function SharedMedia(props: Props) {
  const [translateX, setTranslateX] = useState(0);
  const { showMedia, showFiles, showGroups, chatMessages, chatId } = props;
  const messagesWithMedia = chatMessages.filter((msg) => {
    if (msg.media.length > 0) {
      return true
    } else {
      return false
    }
  });
  const messagesWithFiles = chatMessages.filter((msg) => {
    if (msg.file) {
      return true
    } else {
      return false
    }
  });


  const files = [
    { fileName: "cv.doc", size: "1mb", date: "Aug 4, 2023" },
    { fileName: "project.zip", size: "2mb", date: "Jun 8, 2023" },
  ];

  const groups = [
    {
      title: "Movies",
      groupImg:
        "https://anime.atsit.in/pl/wp-content/uploads/2022/07/luffy-kontra-ichigo-kto-wygralby-walke.jpg",
      members: 10,
    },
    {
      title: "Boys",
      groupImg:
        "https://dynamicmedia.livenationinternational.com/h/v/h/c96f2f89-725a-427b-b111-aa45c0ba4dfe.jpg",
      members: 5,
    },
  ];

  

  useEffect(() => {
    if (showMedia) {
      setTranslateX(0);
    }
    if (showFiles) {
      setTranslateX(-100);
    }
    if (showGroups) {
      setTranslateX(-200);
    }
  }, [showFiles, showMedia, showGroups]);

  return (
    <div className="overflow-x-hidden">
      <div
        className="flex w-full ease-in-out duration-500 "
        style={{ transform: `translateX(${translateX}%)` }}
      >
        <Media  messages={messagesWithMedia} chatId={chatId} />
        <Files  messages={messagesWithFiles} chatId={chatId} />
        <Groups groups={groups} />
      </div>
    </div>
  );
}
