import React from "react";
import BaseYoutube, { YouTubeProps as BaseYoutubeProps } from "react-youtube";
import styles from "./youtube.module.scss";

type YoutubeProps = BaseYoutubeProps;

const Youtube: React.FC<YoutubeProps> = (props) => {
  return <BaseYoutube {...props} iframeClassName={styles.iframe} />;
};

export default Youtube;
