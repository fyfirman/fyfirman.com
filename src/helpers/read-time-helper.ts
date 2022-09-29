import { ReadTimeResults } from "reading-time";

export const getReadingTimeInMin = (readingTime: ReadTimeResults) => {
  if (readingTime.minutes < 1) {
    return 1;
  }
  return `${Math.ceil(readingTime.minutes)}`;
};
