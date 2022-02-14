import React from "react";
import Moon from "@assets/images/moon-sharp.svg";
import Sun from "@assets/images/sunny-sharp.svg";
import Image from "next/image";
import styles from "./dark-toggler.module.scss";
import useAppDarkMode from "~/hooks/useAppDarkMode";

const DarkToggler = () => {
  const [isDarkModeActive, toggleDarkMode] = useAppDarkMode();

  return (
    <button className={styles["dark-toggler"]} onClick={toggleDarkMode}>
      {isDarkModeActive ? (
        <Image alt="Dark Mode Icon" height={24} priority src={Moon as string} width={24} />
      ) : (
        <Image alt="Light Mode Icon" height={24} priority src={Sun as string} width={24} />
      )}
    </button>
  );
};

export default React.memo(DarkToggler);
