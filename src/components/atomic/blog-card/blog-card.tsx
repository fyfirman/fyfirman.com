import React from "react";
import Image from "next/image";
import { ReadTimeResults } from "reading-time";
import { formatReadableDate } from "~/helpers/date-helper";
import { getReadingTimeInMin } from "~/helpers/read-time-helper";
import styles from "./blog-card.module.scss";

interface BlogCardProps {
  href: string;
  imageURI: StaticImageData;
  title: string;
  publishedDate: Date;
  readingTime: ReadTimeResults;
}

const imageWidth = 500;

const BlogCard = (props: BlogCardProps) => {
  const { href, imageURI, title, publishedDate, readingTime } = props;

  return (
    <a className={styles["card-container"]} href={href}>
      <div className={styles["card-image"]}>
        <Image
          alt={`${title} Cover Image`}
          height={(imageWidth * 9) / 16}
          placeholder="blur"
          src={imageURI}
          width={imageWidth}
        />
      </div>
      <span className={styles["card-title"]}>{title}</span>
      <span className={styles.body}>
        {formatReadableDate(publishedDate)} - {getReadingTimeInMin(readingTime)} min read
      </span>
    </a>
  );
};

export default BlogCard;
