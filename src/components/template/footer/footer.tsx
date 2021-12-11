import React, { FC } from "react";
import { connect, useDispatch } from "react-redux";
import styles from "./footer.module.scss";
import { clsx } from "~/helpers";
import { useTabletAndBelowMediaQuery } from "~/hooks";
// import end from "~/assets/images/end.svg";

const Footer: FC<{}> = (props) => {
  const { globalState } = props;
  console.log("Footer rerendered");
  const isMobile = useTabletAndBelowMediaQuery();

  const dispatch = useDispatch();

  const handleDecrement = () => {
    dispatch({
      type: "DECREMENT",
    });
  };

  return (
    <footer className={clsx([styles.container, isMobile && styles.mobile])}>
      <button onClick={handleDecrement}>kurangin</button>
      {/* <div className={clsx([styles.footer, isMobile && styles.mobile])}>
        <object className={styles.end} data={end} type="image/svg+xml">
          Firmansyah Yanuar
        </object>
      </div> */}
      {globalState.counter}
      <iframe
        className={styles["spline-danbo"]}
        frameBorder="0"
        src="/spline/danbo/index.html"
        title="3d-spline-danbo"
      />
    </footer>
  );
};

const mapStateToProps = (state) => {
  return {
    globalState: state,
  };
};

export default React.memo(connect(mapStateToProps)(Footer));
