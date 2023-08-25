import "~/styles/globals.css";
import "@fontsource/nunito-sans";
import "@fontsource/manrope";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import "~/styles/code-light.scss";
import "~/styles/code-dark.scss";
import styles from "~/styles/App.module.scss";
import Navbar from "~/components/template/navbar";
import { clsx } from "~/helpers/classname-helper";
import useResponsive from "~/hooks/useResponsive";
import Footer from "~/components/template/footer/footer";
import useGTM from "~/hooks/useGTM";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/utils/query-client";
// eslint-disable-next-line import/no-unresolved
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const { isMobile } = useResponsive();
  const router = useRouter();
  const noMarginNavbar = ["/"];

  useGTM();
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
    <QueryClientProvider client={queryClient}>
      <div className={`${styles.root} ${darkModeActive ? "dark" : "light"}`}>
        <Navbar />
        <main
          className={clsx([
            styles["body-container"],
            isMobile && styles.mobile,
            noMarginNavbar.includes(router.pathname) && styles["no-margin"],
          ])}
        >
          <Component {...pageProps} />
          <Footer />
        </main>
      </div>
      <Analytics />
    </QueryClientProvider>
  );
}

export default React.memo(withDarkMode(MyApp));
