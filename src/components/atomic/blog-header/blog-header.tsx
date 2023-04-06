import React from "react";
import { ReadTimeResults } from "reading-time";
import { BlogLanguage } from "~/utils/mdx/mdx-types";
import { getReadingTimeInMin } from "~/helpers/read-time-helper";
import { formatReadableDate } from "~/helpers/date-helper";
import { getEmojiLanguage } from "~/helpers/string-helper";
import styled from "styled-components";
import { Heading1, SubParagraph } from "../typography/typography";
import styles from "./blog-header.module.scss";

// TODO: modify this to div
const BlogInfo = styled(SubParagraph)`
  color: var(--text-secondary);
  gap: 0.5rem;
  display: flex;
`;

interface BlogHeaderProps {
  title: string;
  readingTime: ReadTimeResults;
  publishedAt: Date;
  language: BlogLanguage;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, readingTime, publishedAt, language }) => {
  return (
    <div className={styles.container}>
      <Heading1>{title}</Heading1>
      <BlogInfo>
        <span>{formatReadableDate(publishedAt)}</span>
        <span>·</span>
        <span>{getReadingTimeInMin(readingTime)} min read</span>
        <span>·</span>
        <span>{getEmojiLanguage(language)}</span>
      </BlogInfo>
    </div>
  );
};

export default BlogHeader;
