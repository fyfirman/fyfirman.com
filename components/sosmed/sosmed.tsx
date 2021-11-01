import React from "react";
import styles from "./sosmed.module.scss";
import Image from "next/image";

interface SosmedProps {
  href: string;
  name: string;
  isMiddle?: boolean;
  position: "left" | "right" | "top" | "bottom";
}

const Sosmed = (props: SosmedProps) => {
  const { href, name, isMiddle, position } = props;
  const imageURI = require(`../../images/sosmed/${name.toLowerCase().split(" ").join("-")}.svg`);

  return (
    <a
      href={href}
      className={`${styles.sosmed} ${styles[position]} ${isMiddle ? styles.middle : undefined}`}
    >
      <div className={styles.svg}>
        <Image src={imageURI} alt={name} />
      </div>
    </a>
  );
};

export default Sosmed;
