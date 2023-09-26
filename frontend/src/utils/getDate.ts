import months from "./months";

export default function getDate(timeStamp: Date | string) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const messageDate = new Date(timeStamp);
  const day = messageDate.getDate();
  const month = months.at(messageDate.getMonth());
  const year = messageDate.getFullYear();
  return {day, month, year, currentDate, currentYear};
}
