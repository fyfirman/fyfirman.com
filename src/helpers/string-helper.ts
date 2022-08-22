import { BlogLanguage } from "~/utils/mdx/mdx-types";

export const getEmojiLanguage = (language: BlogLanguage) => {
  if (language === BlogLanguage.EN) {
    return "🇬🇧";
  }
  return "🇮🇩";
};
