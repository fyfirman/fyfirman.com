import React, { FC } from "react";
import styles from "./footer.module.scss";
import { clsx } from "~/helpers";
import { useResponsive } from "~/hooks";

const Footer: FC<{}> = () => {
  const isMobile = useResponsive();

  return (
    <footer className={clsx([styles.container, isMobile && styles.mobile])}>
      <iframe
        className={styles["spline-danbo"]}
        frameBorder="0"
        src="/spline/danbo/index.html"
        title="3d-spline-danbo"
      />
    </footer>
  );
};

export default React.memo(Footer);
