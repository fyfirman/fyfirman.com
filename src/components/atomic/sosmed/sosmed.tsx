import React, { memo } from "react";
import Image, { ImageProps } from "next/image";
import useResponsive from "~/hooks/useResponsive";
import styles from "./sosmed.module.scss";

interface SosmedProps {
  href: string;
  name: string;
  isMiddle?: boolean;
  position: "left" | "right" | "top" | "bottom";
}

const Sosmed = (props: SosmedProps) => {
  const { href, name, isMiddle, position } = props;
  const { isMobile } = useResponsive();

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
          src={require(`@assets/images/sosmed/${name.toLowerCase().split(" ").join("-")}.svg`) as ImageProps["src"]}
          width={!isMobile ? "32" : "24"}
        />
      </div>
    </a>
  );
};

export default memo(Sosmed);
