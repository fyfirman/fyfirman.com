import React from "react";
import Moon from "@assets/images/moon-sharp.svg";
import Sun from "@assets/images/sunny-sharp.svg";
import Image from "next/image";
import styles from "./dark-toggler.module.scss";
import useAppDarkMode from "~/hooks/useAppDarkMode";
import { cloudinaryLoader } from "@/src/lib/image/cloudinary-loader";

const DarkToggler = () => {
  const [isDarkModeActive, toggleDarkMode] = useAppDarkMode();

  return (
    <button className={styles["dark-toggler"]} onClick={toggleDarkMode}>
      {isDarkModeActive ? (
        <Image alt="Dark Mode Icon" loader={cloudinaryLoader} src={Moon as string} />
      ) : (
        <Image alt="Light Mode Icon" loader={cloudinaryLoader} src={Sun as string} />
      )}
    </button>
  );
};

export default React.memo(DarkToggler);
