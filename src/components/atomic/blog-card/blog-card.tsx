import React from "react";
import Image, { ImageProps } from "next/image";
import { ReadTimeResults } from "reading-time";
import { formatReadableDate } from "~/helpers/date-helper";
import { getReadingTimeInMin } from "~/helpers/read-time-helper";
import Link from "next/link";
import { SubParagraph } from "../typography/typography";
import styles from "./blog-card.module.scss";

interface BlogCardProps {
  href: string;
  imageURI: ImageProps["src"];
  title: string;
  publishedDate: Date;
  readingTime: ReadTimeResults;
}

const imageWidth = 345;

const BlogCard = (props: BlogCardProps) => {
  const { href, imageURI, title, publishedDate, readingTime } = props;

  return (
    <Link className={styles["card-container"]} href={href} passHref>
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
      <SubParagraph>
        {formatReadableDate(publishedDate)} - {getReadingTimeInMin(readingTime)} min read
      </SubParagraph>
    </Link>
  );
};

export default BlogCard;
