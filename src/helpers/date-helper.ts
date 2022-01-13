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

export const formatDateDifference = (oldDate: Date) => {
  const now = new Date();

  if (oldDate.getTime() > now.getTime()) {
    return "Invalid oldDate";
  }

  const diffMonths = differenceInMonths(now, oldDate);
  if (diffMonths > 0) {
    return format(oldDate, "dd-MM-yyyy H:mm");
  }

  const diffWeeks = differenceInWeeks(now, oldDate);
  if (diffWeeks > 0) {
    if (diffWeeks === 1) {
      return "One week ago";
    }
    return `${diffWeeks} weeks ago`;
  }

  const diffDays = differenceInDays(now, oldDate);
  if (diffDays > 0) {
    if (diffDays === 1) {
      return "One day ago";
    }
    return `${diffDays} days ago`;
  }

  const diffHours = differenceInHours(now, oldDate);
  if (diffHours > 0) {
    if (diffHours === 1) {
      return "About an hour ago";
    }
    return `${diffHours} hours ago`;
  }

  const diffMinutes = differenceInMinutes(now, oldDate);
  if (diffMinutes > 1) {
    return `${diffMinutes} minutes ago`;
  }

  return `Just now`;
};

export const formatTimeStampToDateDifference = (second: number) => formatDateDifference(new Date(second));
