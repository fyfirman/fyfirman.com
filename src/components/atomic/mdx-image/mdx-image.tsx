/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./mdx-image.module.scss";

interface MdxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  altComponent?: React.Component;
}

const MdxImage: React.VFC<MdxImageProps> = ({ alt, altComponent, ...rest }) => {
  return (
    <span className={styles.container}>
      <img alt={alt} {...rest} />
      <span className={styles["alt-text"]}>{altComponent ?? alt}</span>
    </span>
  );
};

export default MdxImage;
