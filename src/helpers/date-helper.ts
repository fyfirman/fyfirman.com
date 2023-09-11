import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  format,
  startOfWeek,
  sub,
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

export const formatReadableDate = (date: Date) => {
  return format(date, "dd MMM yyyy");
};

export const formatTimeStampToDateDifference = (second: number) => formatDateDifference(new Date(second));

export const getMonthsAndWeeksForLastYearToNow = (): { monthName: string; weeks: number }[] => {
  const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let currentDate = sub(
    startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
    { years: 1 },
  );

  const results: { monthName: string; weeks: number }[] = [
    {
      monthName: monthNames[currentDate.getMonth()],
      weeks: 1,
    },
  ];
  while (currentDate < new Date()) {
    const nextDate = add(currentDate, {
      days: 7,
    });

    if (nextDate.getMonth() === currentDate.getMonth()) {
      // @ts-expect-error --- results at is already checked
      results.at(-1).weeks += 1;
    } else {
      results.push({
        monthName: monthNames[nextDate.getMonth()],
        weeks: 1,
      });
    }

    currentDate = nextDate;
  }

  return results;
};

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
