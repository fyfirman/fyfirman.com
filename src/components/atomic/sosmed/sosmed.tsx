import React, { memo } from "react";
import Image from "next/image";
import styles from "./sosmed.module.scss";

interface SosmedProps {
  href: string;
  name: string;
  isMiddle?: boolean;
  position: "left" | "right" | "top" | "bottom";
}

const Sosmed = (props: SosmedProps) => {
  const { href, name, isMiddle, position } = props;

  return (
    <a
      className={`${styles.sosmed} ${styles[position]} ${isMiddle ? styles.middle : undefined}`}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className={styles.svg}>
        <Image
          alt={`${name} Icon`}
          // Cannot resolve how to dynamically import with typescript
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={require(`../../../assets/images/sosmed/${name.toLowerCase().split(" ").join("-")}.svg`)}
        />
      </div>
    </a>
  );
};

export default memo(Sosmed);
