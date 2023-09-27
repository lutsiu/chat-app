import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import CalendarOverlay from "../../Overlays/SearchOverlay/Calendar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import useResponsive from "../../../../hooks/useResponsive";
import styles from "./style.module.scss";
import { createPortal } from "react-dom";
import { handleScrollToMessage } from "../../../../state/message";
import { SearchedMessage } from "../../../../interfaces/models";
interface Props {
  chatId: string;
}
export default function FoundMessagesBottomBar(props: Props) {
  const { chatId } = props;

  const { showSearchBar } = useSelector((state: ReduxState) => state.ui);
  const { searchMessages } = useSelector((state: ReduxState) => state.message);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const disabledChevronUp =
    !searchMessages ||
    searchMessages.length === 0 ||
    (searchMessages && activeIndex === 0);
  const disabledChevronDown =
    !searchMessages ||
    searchMessages.length === 0 ||
    (searchMessages && activeIndex === searchMessages.length - 1);

  const dispatch = useDispatch();

  const getMsgTop = (move: 'up' | 'down') => {
    if (!searchMessages) return;
    const msg = searchMessages.at(move === 'down' ? activeIndex - 1 : activeIndex + 1) as SearchedMessage;
    console.log(msg)
    const dom = document.getElementById(msg.message._id as string);
    if (!dom) return
    const parentEl = dom.parentElement as HTMLElement;
    const top = dom.offsetTop + parentEl.offsetTop;
    return top;
  }

  function moveToPrevMessage() {
    if (!searchMessages) return;
    if (activeIndex === 0) {
      return;
    }
    const top = getMsgTop('down') as number;
    dispatch(handleScrollToMessage({top}));
    setActiveIndex((prev) => prev - 1);

  }

  function moveToNextMessage() {
    if (!searchMessages) return;
    if (activeIndex === searchMessages.length - 1) return;
    const top = getMsgTop('up') as number;
    dispatch(handleScrollToMessage({top}));
    setActiveIndex(prev => prev + 1);
  }

  useEffect(() => {
    if (searchMessages) {
      setActiveIndex(searchMessages.length - 1);
    }
  
  }, [searchMessages]);
  return (
    <>
      {showSearchBar && (
        <div className="fixed bottom-[0] flex items-center justify-between px-[1rem] md:w-[65%] w-full bg-gray-800 h-[5.2rem]">
          {!searchMessages && (
            <div
              className={`${styles["icon-parent"]} cursor-pointer rounded-full p-[0.6rem]`}
              onClick={() => setShowCalendar(true)}
            >
              <AiOutlineCalendar className="w-[2.5rem] h-[2.5rem] text-gray-400" />
            </div>
          )}
          {searchMessages && (
            <div className="flex gap-[.5rem] text-2xl text-stone-400 font-medium">
              {(searchMessages.length > 0 ?? activeIndex) && (
                <>
                  <span>{activeIndex + 1}</span>
                  <span>of</span>
                  <span>{searchMessages.length}</span>
                </>
              )}
              {searchMessages.length === 0 && <span>No results</span>}
            </div>
          )}
          <div className="flex gap-[1rem]">
            <div
              className={`${styles["icon-parent"]} ${
                disabledChevronUp ? styles["icon-parent-disabled"] : ""
              } cursor-pointer rounded-full p-[0.6rem]`}
              onClick={moveToPrevMessage}
            >
              <FiChevronUp className="w-[2.6rem] h-[2.6rem]" />
            </div>
            <div
              className={`${styles["icon-parent"]} ${
                disabledChevronDown ? styles["icon-parent-disabled"] : ""
              } cursor-pointer rounded-full p-[0.6rem]`}
              onClick={moveToNextMessage}
            >
              <FiChevronDown className="w-[2.6rem] h-[2.6rem]" />
            </div>
          </div>
        </div>
      )}
      {showCalendar &&
        createPortal(
          <CalendarOverlay
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            chatId={chatId}
          />,
          document.getElementById("overlay") as HTMLElement
        )}
    </>
  );
}
