import React from "react";
import Image from "next/image";
import { ReadTimeResults } from "reading-time";
import { formatReadableDate } from "~/helpers/date-helper";
import { getReadingTimeInMin } from "~/helpers/read-time-helper";
import Link from "next/link";
import styles from "./blog-card.module.scss";
import styled from "styled-components";
import { SubParagraph } from "../typography/typography";

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
    <Link href={href} passHref>
      <a className={styles["card-container"]}>
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
      </a>
    </Link>
  );
};

export default BlogCard;
