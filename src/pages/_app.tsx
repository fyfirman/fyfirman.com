import "../styles/globals.css";
import "@fontsource/nunito-sans";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import animationData from "@assets/lotties/loading-animation.json";
import Lottie from "react-lottie";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import { Navbar } from "../components/template";
import styles from "../styles/App.module.scss";
import { clsx } from "~/helpers/classname-helper";
import { useTabletAndBelowMediaQuery } from "~/hooks";
import Footer from "~/components/template/footer/footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [isReady, setIsReady] = useState(false);
  const { darkModeActive } = useDarkMode();
  const isMobile = useTabletAndBelowMediaQuery();

  useEffect(() => {
    document.title = "Loading...";
    console.log("halo, mau cari apa bos?");

    setTimeout(() => {
      void document.fonts.load("12px Nunito Sans").then(() => {
        document.title = "Firmansyah Yanuar";
        setIsReady(true);
      });
    }, 1000);
  }, []);

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

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return isReady ? (
    <div className={`${styles.root} ${darkModeActive ? "dark" : "light"}`}>
      <Navbar />
      <div className={clsx([styles["body-container"], isMobile && styles.mobile])}>
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <Lottie height={250} options={lottieOptions} width={250} />
    </div>
  );
}

export default withDarkMode(MyApp);
