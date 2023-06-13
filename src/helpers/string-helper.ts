import { BlogLanguage } from "~/utils/mdx/mdx-types";

export const getEmojiLanguage = (language: BlogLanguage) => {
  if (language === BlogLanguage.EN) {
    return "🇬🇧";
  }
  return "🇮🇩";
};

export const addHttpsIfNeeded = (url: string): string => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }

  return url;
};
