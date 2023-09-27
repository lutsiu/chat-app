import getDate from "./getDate";
export default function normalizeDateName(date: string | Date) {
  const { currentDate, currentYear, day, month, year } = getDate(date);
  const currentDateISO = currentDate.toISOString().split("T")[0];
  const yesterday = new Date(
    new Date(currentDate).setDate(currentDate.getDate() - 1)
  ).toISOString();
  let dateToShow = date;
  if (currentDate.getFullYear() === year) {
    if (currentDateISO === date) {
      return dateToShow = "today";
    } else if (currentDateISO === yesterday) {
      return dateToShow = "yesterday";
    } else {
     return  dateToShow = `${month} ${day}`;
    }
  } else {
   return  dateToShow = `${year}/${month}/${day}`;
  }
}