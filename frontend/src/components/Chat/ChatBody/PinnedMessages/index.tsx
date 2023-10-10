import { BsPinAngleFill } from "react-icons/bs";
import { IMessage } from "../../../../interfaces/models";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { useState, useEffect } from "react";
import { handleScrollToMessage } from "../../../../state/message";
import TextTransition from "react-text-transition";
import { getPinnedbarMessageContent } from "../../../../utils/getActionBarMessageContent";
import spinner from "../../../../assets/tail-spin.svg";
import SkeletonElement from "../../../Widgets/Skeletons/SkeletonElement";
interface Props {
  pinnedMessages: IMessage[];
}
export default function PinnedMessages(props: Props) {
  const { pinnedMessages } = props;
  const [imageSrc, setImageSrc] = useState(spinner);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const { messagesContainerScrollTop } = useSelector(
    (state: ReduxState) => state.message
  );
  const [activePinnedMessage, setActivePinnedMessage] = useState(
    pinnedMessages.at(-1)
  );
  const [activePinnedMessageUpperPoint, setActivePinnedMessageUpperPoint] =
    useState<number | null>(null);

  const [indexOfPinnedMessage, setIndexOfPinnedMessage] = useState(
    pinnedMessages.findIndex((msg) => msg._id === activePinnedMessage?._id)
  );

  const dispatch = useDispatch();
  const PINNED_MESSAGES_BAR_HEIGHT = 43;
  const MESSAGES_BAR_HEIGHT = 52;
  function handleScrollToPinnedMessage() {
    dispatch(handleScrollToMessage({ top: activePinnedMessageUpperPoint }));
  }

  // setting upper point of pinned message
  useEffect(() => {
    if (activePinnedMessage && activePinnedMessage._id) {
      const messageDom = document.getElementById(
        activePinnedMessage._id
      ) as HTMLElement;
      if (!messageDom) return;
      const offsetChildTop = messageDom.offsetTop;
      const parent = messageDom.parentElement as HTMLElement;
      const upperPoint = parent.offsetTop + offsetChildTop;
      setActivePinnedMessageUpperPoint(upperPoint);
    }
  }, [activePinnedMessage, messagesContainerScrollTop]);

  // change active pinned message
  useEffect(() => {
    const activePinnedMessages = pinnedMessages.map((msg) => {
      const dom = document.getElementById(msg._id as string) as HTMLElement;
      if (!dom) return;
      const parent = dom.parentElement as HTMLElement;
      const rect = dom.getBoundingClientRect();
      const messageRectTop = rect.top;
      const viewportHeight = window.innerHeight;
      const messageTopIsLower =
        dom.offsetTop + parent.offsetTop <
        messagesContainerScrollTop! + PINNED_MESSAGES_BAR_HEIGHT;
      const stillInViewPort =
        viewportHeight - MESSAGES_BAR_HEIGHT > messageRectTop;
      const pinnedMessageIsActive = messageTopIsLower || stillInViewPort;
      if (pinnedMessageIsActive) {
        return { msg, pinnedMessageIsActive };
      }
    });

    const filtered = activePinnedMessages.filter((msg) => msg);
    setActivePinnedMessage(
      filtered.length > 0 ? filtered.at(-1)?.msg : pinnedMessages[0]
    );
    setIndexOfPinnedMessage(
      filtered.length > 0
        ? pinnedMessages.findIndex(
            (msg) => msg._id === filtered.at(-1)?.msg._id
          )
        : 0
    );
  }, [messagesContainerScrollTop, pinnedMessages]);
  const activePinnedMessageMedia =
    activePinnedMessage && activePinnedMessage.media.length > 0
      ? {
          path: activePinnedMessage.media[0].filePath,
          type: activePinnedMessage.media[0].fileType,
        }
      : null;

  // for image
  useEffect(() => {
    if (!activePinnedMessageMedia?.type.includes("image")) return;
    const image = new Image();
    image.src = `http://localhost:3000/${activePinnedMessageMedia.path}`;
    image.onload = () => {
      setIsLoading(false);
      setImageSrc(image.src);
    };
  }, [activePinnedMessageMedia?.path, activePinnedMessageMedia?.type]);

  // for video
  useEffect(() => {
    if (!activePinnedMessageMedia?.type.includes("video")) return;
    const video = document.createElement("video");
    video.src = `http://localhost:3000/${activePinnedMessageMedia?.path}`;

    video.onloadedmetadata = () => {
      setIsLoading(false);
      setVideoSrc(video.src);
    };

    return () => {
      video.removeAttribute("src");
      video.load();
    };
  }, [activePinnedMessageMedia?.path, activePinnedMessageMedia?.type]);
  return (
    <ul className="absolute w-full py-[.4rem] bg-slate-700 z-[2] flex justify-between px-[1rem] items-center">
      <div className="flex gap-[1rem]">
        {activePinnedMessageMedia && (
          <div className="w-[3.5rem] h-[3.5rem] object-cover rounded-lg overflow-hidden">
            {!isLoading && activePinnedMessageMedia.type.includes("image") && (
              <img
                className="w-full h-full object-cover"
                src={imageSrc}
              />
            )}
            {isLoading  && <SkeletonElement count={1} className="w-full h-full object-cover"/>}
            {!isLoading && activePinnedMessageMedia.type.includes("video") && (
              <video className="w-full h-full object-cover">
                <source
                  src={videoSrc}
                  type={activePinnedMessageMedia.type}
                />
              </video>
            )}
          </div>
        )}
        <div
          onClick={handleScrollToPinnedMessage}
          className="flex-1 cursor-pointer"
        >
          <span className="text-purple-400 font-medium text-lg flex items-center">
            Pinned message
            <TextTransition className="ml-[0.3rem]">{`#${
              indexOfPinnedMessage + 1
            }`}</TextTransition>
          </span>
          <TextTransition className="text-lg">
            {getPinnedbarMessageContent(activePinnedMessage!)}
          </TextTransition>
        </div>
      </div>

      <div>
        <BsPinAngleFill className="text-gray-400 w-[1.5rem] h-[1.5rem] hover:text-white cursor-pointer" />
      </div>
    </ul>
  );
}
