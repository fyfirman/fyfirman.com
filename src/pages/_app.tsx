import "../styles/globals.css";
import "@fontsource/nunito-sans";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import { Navbar } from "../components/template";
import styles from "../styles/App.module.scss";
import { clsx } from "~/helpers/classname-helper";
import { useResponsive } from "~/hooks";
import Footer from "~/components/template/footer/footer";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const { isMobile } = useResponsive();

  useEffect(() => {
    const bodyClassName = document.body.className;

    if (!bodyClassName.includes("light") && !darkModeActive) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [darkModeActive]);

  return (
    <div className={`${styles.root} ${darkModeActive ? "dark" : "light"}`}>
      <Navbar />
      <div className={clsx([styles["body-container"], isMobile && styles.mobile])}>
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}

export default React.memo(withDarkMode(MyApp));
