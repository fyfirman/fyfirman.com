import React from "react";
/* @ts-expect-error ignore */
import Moon from "@assets/images/moon-sharp.svg";
/* @ts-expect-error ignore */
import Sun from "@assets/images/sunny-sharp.svg";
import styles from "./dark-toggler.module.scss";
import useAppDarkMode from "~/hooks/useAppDarkMode";

const DarkToggler = () => {
  const [isDarkModeActive, toggleDarkMode] = useAppDarkMode();

  return (
    <button className={styles["dark-toggler"]} onClick={toggleDarkMode}>
      {isDarkModeActive ? (
        <img alt="Dark Mode Icon" src={Moon as string} />
      ) : (
        <img alt="Light Mode Icon" src={Sun as string} />
      )}
    </button>
  );
};

export default React.memo(DarkToggler);
