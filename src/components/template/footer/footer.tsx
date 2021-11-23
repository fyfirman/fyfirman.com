import { FC } from "react";
import styles from "./footer.module.scss";
import { clsx } from "~/helpers";
import { useTabletAndBelowMediaQuery } from "~/hooks";
// import end from "~/assets/images/end.svg";

const Footer: FC<{
  noMargin: boolean;
}> = ({ noMargin }) => {
  const isMobile = useTabletAndBelowMediaQuery();

  return (
    <footer className={clsx([styles.container, isMobile && styles.mobile, noMargin && styles["no-margin"]])}>
      {/* <div className={clsx([styles.footer, isMobile && styles.mobile])}>
        <object className={styles.end} data={end} type="image/svg+xml">
          Firmansyah Yanuar
        </object>
      </div> */}
      <iframe
        className={styles["spline-danbo"]}
        frameBorder="0"
        src="/spline/danbo/index.html"
        title="3d-spline-danbo"
      />
    </footer>
  );
};

export default Footer;
