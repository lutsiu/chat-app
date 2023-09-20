import { BsPinAngleFill } from "react-icons/bs";
import { IMessage } from "../../../../interfaces/models";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { useState, useEffect } from "react";
import { handleScrollToMessage } from "../../../../state/message";
import TextTransition from "react-text-transition";
interface Props {
  pinnedMessages: IMessage[];
}
export default function PinnedMessages(props: Props) {
  const { pinnedMessages } = props;
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
      const upperPoint = messageDom.offsetTop;
      setActivePinnedMessageUpperPoint(upperPoint);
    }
  }, [activePinnedMessage, messagesContainerScrollTop]);

  // change active pinned message
  useEffect(() => {
    const activePinnedMessages = pinnedMessages.map((msg) => {
      const dom = document.getElementById(msg._id as string) as HTMLElement;
      const rect = dom.getBoundingClientRect();
      const messageRectTop = rect.top;
      const viewportHeight = window.innerHeight;
      const messageTopIsLower =
        dom.offsetTop <
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

  return (
    <ul className="absolute w-full py-[.4rem] bg-slate-700 z-[2] flex justify-between px-[1rem] items-center">
      <div onClick={handleScrollToPinnedMessage} className="flex-1 cursor-pointer">
        <span className="text-purple-400 font-medium text-lg flex items-center">
          Pinned message
          <TextTransition className="ml-[0.3rem]">{`#${
            indexOfPinnedMessage + 1
          }`}</TextTransition>
        </span>
        <TextTransition className="text-lg">
          {`${activePinnedMessage?.message.slice(0, 70)}${activePinnedMessage?.message.length && "..."}`}
          
        </TextTransition>
      </div>
      <div>
        <BsPinAngleFill className="text-gray-400 w-[1.5rem] h-[1.5rem] hover:text-white cursor-pointer" />
      </div>
    </ul>
  );
}