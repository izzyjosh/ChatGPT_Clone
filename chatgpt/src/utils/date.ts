import { format, differenceInDays, getDay } from "date-fns";

export const formatDate = date => {
  const today = new Date();
  const diffTime = today - date;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return weekday[getDay(date)];
  } else {
    return format(date, "MMM dd, yyyy");
  }
};
