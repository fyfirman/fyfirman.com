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

  const diffMonths = differenceInMonths(date, now);
  if (diffMonths > 0) {
    return format(date, "dd-MM-yyyy H:mm");
  }

  const diffWeeks = differenceInWeeks(date, now);
  if (diffWeeks > 0) {
    if (diffWeeks === 1) {
      return "One week ago";
    }
    return `${diffWeeks} weeks ago`;
  }

  const diffDays = differenceInDays(date, now);
  if (diffDays > 0) {
    if (diffDays === 1) {
      return "One day ago";
    }
    return `${diffDays} days ago`;
  }

  const diffHours = differenceInHours(date, now);
  if (diffHours > 0) {
    if (diffHours === 1) {
      return "About an hour ago";
    }
    return `${diffHours} hours ago`;
  }

  const diffMinutes = differenceInMinutes(date, now);
  if (diffMinutes > 1) {
    return `${diffMinutes} minutes ago`;
  }

  return `Just now`;
};

export const formatTimeStampToDateDifference = (second: number) => formatDateDifference(new Date(second));
