import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.scss";
import { Value } from "../../../../../../node_modules/react-calendar/dist/esm/shared/types";
import { useSocket } from "../../../../../context/SocketContext";
import { useEffect } from "react";
import { IMessage } from "../../../../../interfaces/models";
import { useDispatch } from "react-redux";
import { handleScrollToMessage } from "../../../../../state/message";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../../interfaces/redux";
interface Props {
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  setSelectedDate: (date: Date) => void;
  selectedDate: null | Date;
}

export default function CalendarOverlay(props: Props) {
  const {
    showCalendar,
    setShowCalendar,
    setSelectedDate,
    selectedDate,
  } = props;
  const {chatId} = useSelector((state: ReduxState) => state.chat)

  const INITIAL_DATE = new Date(2023, 8, 8);
  const socket = useSocket();
  const handleCalendarChange = (value: Value) => {
    setSelectedDate(value as Date);
  };
  const dispatch = useDispatch()
  function findMessageByDate() {
    if (selectedDate) {
      socket.emit("find-message-by-date", { chatId, date: selectedDate });
    }
    setShowCalendar(false);
  } 
  useEffect(() => {
    socket.on('find-message-by-date', (message: IMessage) => {
      const messageDOM = document.getElementById(message._id as string) as HTMLElement;
      const messageParent = messageDOM?.parentElement as HTMLElement;
      dispatch(handleScrollToMessage({top: messageDOM?.offsetTop + messageParent.offsetTop }))
    });
  }, [socket,dispatch]);
  return (
    <motion.div
      className="calendar-overlay fixed top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("calendar-overlay")) {
          setShowCalendar(false);
        }
      }}
      style={{ background: "rgba(0,0,0,.5)" }}
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: showCalendar ? 1 : 0,
        pointerEvents: showCalendar ? "auto" : "none",
      }}
    >
      <div>
        <Calendar
          prev2Label={null}
          next2Label={null}
          minDate={INITIAL_DATE}
          onChange={handleCalendarChange}
        />
        <div className="w-full bg-gray-800 rounded-b-xl py-[2rem] flex justify-center gap-[1.5rem]">
          <button
            className="py-[1rem] px-[2rem] rounded-xl duration-200 text-2xl font-semibold text-purple-500 form-button"
            onClick={() => setShowCalendar(false)}
          >
            CANCEL
          </button>
          <button
            className="py-[1rem] px-[2rem] rounded-xl duration-200 text-2xl font-semibold text-purple-500 form-button"
            onClick={findMessageByDate}
          >
            JUMP TO DATE
          </button>
        </div>
      </div>
    </motion.div>
  );
}
