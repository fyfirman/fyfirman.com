import React from "react";
import Image from "next/image";
import styles from "./card.module.scss";

interface CardProps {
  href: string;
  imageURI: StaticImageData;
  title: string;
  desc: string;
  stack: string[];
  notAvailable?: boolean;
}

const Card = (props: CardProps) => {
  const { href, imageURI, title, desc, stack, notAvailable = false } = props;

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-image"]}>
        <Image src={imageURI} alt={title} />
      </div>
      <h4 className={styles["card-title"]}>{title}</h4>
      <p className={styles.body}>{desc}</p>
      <p className={styles.body}>Build with : {stack.join(", ")}</p>
      <a className={!notAvailable ? "card-button" : "card-button not-available"} href={href}>
        {!notAvailable ? "See Project ›" : "Not available yet"}
      </a>
    </div>
  );
};

export default Card;
