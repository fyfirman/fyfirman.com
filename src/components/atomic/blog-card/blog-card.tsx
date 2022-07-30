import React from "react";
import Image from "next/image";
import styles from "./blog-card.module.scss";

interface BlogCardProps {
  href: string;
  imageURI: StaticImageData;
  title: string;
  desc: string;
  notAvailable?: boolean;
}

const BlogCard = (props: BlogCardProps) => {
  const { href, imageURI, title, desc, notAvailable = false } = props;

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-image"]}>
        <Image alt={`${title} Snapshot`} src={imageURI} />
      </div>
      <span className={styles["card-title"]}>{title}</span>
      <p className="text-body">{desc}</p>
      <a
        className={`${styles["card-button"]} ${notAvailable ? "not-available" : ""}`}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {!notAvailable ? "See Project ›" : "Not available yet"}
      </a>
    </div>
  );
};

export default BlogCard;
