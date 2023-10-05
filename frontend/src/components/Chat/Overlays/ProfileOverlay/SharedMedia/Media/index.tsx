import { IMessage } from "../../../../../../interfaces/models";
import { fullMonth } from "../../../../../../utils/months";
import sortMsgsByDate from "../../../../../../utils/sortMsgsByDate";
import Content from "./Content";
interface Props {
  messages: IMessage[];
  chatId: string;
}

export default function Media(props: Props) {
  const { messages, chatId } = props;
  const messagesWithDates = sortMsgsByDate(messages, "month") as {
    date: {
      year: number;
      month: number;
    };
    messages: IMessage[];
  }[];
  return (
    <div className="min-w-full flex-1">
      {messagesWithDates.map((msg, i) => {
        const { date, messages } = msg;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currectMonth = currentDate.getMonth();
        let dateToReturn: string;
        if (currentYear === date.year) {
          if (currectMonth === date.month) {
            dateToReturn = "";
          } else {
            dateToReturn = fullMonth[date.month];
          }
        } else {
          dateToReturn = `${date.month} ${date.year}`;
        }
        return (
          <div key={i}>
            <h3 className="text-2xl font-medium text-gray-300 ml-[2rem] mt-[1rem]">
              {dateToReturn}
            </h3>
            <ul className="mt-[1rem] grid grid-cols-3 gap-[0.2rem]">
              {messages.map((msg) => {
                return msg.media.map((media) => {
                  return <Content key={media.filePath} media={media} chatId={chatId} message={msg} />;
                });
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
