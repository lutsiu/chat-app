import { IMessage } from "../interfaces/models";

export default function sortMsgsByDate(
  messages: IMessage[],
  sortBy: "day" | "month"
) {
  if (!messages || messages.length === 0) return []
  if (sortBy === "day") {
    const dates = messages.map((msg) => {
      const date = new Date(msg.timeStamp).toISOString().split("T")[0];
      return date;
    });
    const uniqueDates = [...new Set(dates)];
    const messagesSortedByDays = uniqueDates.map((date) => {
      const messagesWithSameDate = messages.filter((msg) => {
        return new Date(msg.timeStamp).toISOString().split("T")[0] === date;
      });
      return {
        date,
        messages: messagesWithSameDate,
      };
    });
    return messagesSortedByDays;
  }
  if (sortBy === "month") {
    const dates = messages.map((msg) => {
      const date = new Date(msg.timeStamp);
      const month = date.getMonth();
      const year = date.getFullYear();
      return `${year},${month}`;
    });
    const uniqueDates = [...new Set(dates)];
    const messagesSortedByMonth = uniqueDates.map((date) => {
      const correctedDateString = date.split(",");
      const year = +correctedDateString[0];
      const month = +correctedDateString[1];
      const correctedDate = { year, month };
      const messagesWithSameDate = messages.filter((msg) => {
        const msgDate = new Date(msg.timeStamp);
        const msgMonth = msgDate.getMonth();
        const msgYear = msgDate.getFullYear();
        if (msgMonth === month && msgYear === year) {
          return true;
        }
      });
      return {date: correctedDate, messages: messagesWithSameDate}
    });
    return messagesSortedByMonth;
  }
}
