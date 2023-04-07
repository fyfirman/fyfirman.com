/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AltText } from "../typography/typography";
import styles from "./mdx-image.module.scss";

interface MdxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  altComponent?: React.Component;
}

const MdxImage: React.VFC<MdxImageProps> = ({ alt, altComponent, ...rest }) => {
  return (
    <span className={styles.container}>
      <img alt={alt} {...rest} />
      <AltText>{altComponent ?? alt}</AltText>
    </span>
  );
};

export default MdxImage;
