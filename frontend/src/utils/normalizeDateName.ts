
import getDate from "./getDate";
export default function normalizeDateName(date: string | Date) {
  const { currentDate,  day, month, year } = getDate(date);
  const currentDateISO = currentDate.toISOString().split("T")[0];
  const yesterday = new Date(
    new Date(currentDate).setDate(currentDate.getDate() - 1)
  ).toISOString();

  if (currentDate.getFullYear() === year) {
    if (currentDateISO === date) {
      return "today";
    } else if (currentDateISO === yesterday) {
      return  "yesterday";
    } else {
     return   `${month} ${day}`;
    }
  } else {
   return  `${year}/${month}/${day}`;
  }
}