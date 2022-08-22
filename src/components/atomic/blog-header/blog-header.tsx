import React from "react";
import { ReadTimeResults } from "reading-time";
import styles from "./blog-header.module.scss";
import { BlogLanguage } from "~/utils/mdx/mdx-types";
import { getReadingTimeInMin } from "~/helpers/read-time-helper";
import { formatReadableDate } from "~/helpers/date-helper";
import { getEmojiLanguage } from "~/helpers/string-helper";

interface BlogHeaderProps {
  title: string;
  readingTime: ReadTimeResults;
  publishedAt: Date;
  language: BlogLanguage;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, readingTime, publishedAt, language }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.infoContainer}>
        <span>{formatReadableDate(publishedAt)}</span>
        <span>·</span>
        <span>{getReadingTimeInMin(readingTime)} min read</span>
        <span>·</span>
        <span>{getEmojiLanguage(language)}</span>
      </div>
    </div>
  );
};

export default BlogHeader;
