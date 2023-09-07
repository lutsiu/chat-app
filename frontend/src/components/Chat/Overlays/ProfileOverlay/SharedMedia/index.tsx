import Media from "./Media";
import Groups from "./Groups";
import Files from "./Files";
import { useState, useEffect } from "react";
interface Props {
  showMedia: boolean;
  showFiles: boolean;
  showGroups: boolean;
}

export default function SharedMedia(props: Props) {
  const [translateX, setTranslateX] = useState(0);

  const media = [
    {
      title: "August",
      media: [
        "https://www.cheatsheet.com/wp-content/uploads/2015/11/cranston-breaking-bad.png",
        "https://64.media.tumblr.com/f3b884075d7b19d1c9477bc366e9b550/8d3a8402cfebd1c3-42/s500x750/73b33b294009f79b6877076e034d6fb714984a1d.jpg",
        "https://i.ytimg.com/vi/gDjMZvYWUdo/hqdefault.jpg",
      ],
    },
    {
      title: "July",
      media: [
        "https://wbijam.pl/grafika/n_wiad_143_logo.jpg",
        "https://www.looper.com/img/gallery/every-power-sasuke-has-on-naruto-explained/intro-1663193400.jpg",
      ],
    },
    {
      title: "June",
      media: [
        "https://i.pinimg.com/originals/90/a7/f6/90a7f67864acea71fb5ffed6aa6298cb.jpg",
      ],
    },
  ];

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

  const { showMedia, showFiles, showGroups } = props;

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
        <Media media={media} />
        <Files files={files} />
        <Groups groups={groups} />
      </div>
    </div>
  );
}
