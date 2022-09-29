/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./mdx-image.module.scss";

const MdxImage: React.VFC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ alt, ...rest }) => {
  return (
    <div className={styles.container}>
      <img alt={alt} {...rest} />
      <span className={styles["alt-text"]}>{alt}</span>
    </div>
  );
};

export default MdxImage;
