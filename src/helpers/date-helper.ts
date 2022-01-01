import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  format,
} from "date-fns";

export const formatTimeStampToFullDate = (second: number) => {
  return format(new Date(second), "dd-MM-yyyy H:mm");
};

export const formatDateDifference = (date: Date) => {
  const now = new Date();

  const diffMonths = differenceInMonths(now, date);
  if (diffMonths > 0) {
    return format(date, "dd-MM-yyyy H:mm");
  }

  const diffWeeks = differenceInWeeks(now, date);
  if (diffWeeks > 1) {
    return `${diffWeeks} weeks ago`;
  }

  const diffDays = differenceInDays(now, date);
  if (diffDays > 1) {
    return `${diffWeeks} days ago`;
  }

  const diffHours = differenceInHours(now, date);
  if (diffHours > 0) {
    if (diffHours === 1) {
      return "About an hour ago";
    }
    return `${diffHours} hours ago`;
  }

  const diffMinutes = differenceInMinutes(now, date);
  if (diffMinutes > 1) {
    return `${diffMinutes} minutes ago`;
  }

  return `Just now`;
};

export const formatTimeStampToDateDifference = (second: number) => formatDateDifference(new Date(second));
