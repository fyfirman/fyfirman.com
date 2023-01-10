import React from "react";
import { clsx } from "~/helpers/classname-helper";
import useResponsive from "~/hooks/useResponsive";
import env from "~/utils/environment";
import { version } from "../../../../package.json";
import styles from "./footer.module.scss";

const Footer: React.VFC<{}> = () => {
  const { isMobile } = useResponsive();

  return (
    <footer className={clsx([styles.container, isMobile && styles.mobile])}>
      {process.env.NODE_ENV !== "production" ? (
        <span className={styles.version}>{`${
          process.env.NODE_ENV.charAt(0).toUpperCase() + process.env.NODE_ENV.slice(1)
        } - v${version}`}</span>
      ) : null}
      {!env.disableSpline ? (
        <iframe
          className={styles["spline-danbo"]}
          frameBorder="0"
          loading="lazy"
          src="/spline/danbo/index.html"
          title="3d-spline-danbo"
        />
      ) : null}
    </footer>
  );
};

export default React.memo(Footer);
