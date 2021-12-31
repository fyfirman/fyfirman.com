import React from "react";
import Image from "next/image";
import Self from "@assets/images/self.jpg";
import { useMediaQuery } from "react-responsive";
import styles from "~/styles/Home.module.scss";
import { clsx } from "~/helpers";
import useResponsive from "~/hooks/useResponsive";

const HomeHeader = () => {
  const { isMobile } = useResponsive();
  const render3D = useMediaQuery({
    query: "(min-device-width: 1080px)",
  });

  return (
    <div className={styles["header-container"]} id="home-header">
      <div className={clsx([styles.jumbotron, isMobile && styles.mobile])}>
        {isMobile && (
          <div className={clsx([styles.photoProfile, styles.mobile])} id="photo-profile-desktop">
            <Image alt="Firmansyah Yanuar Photo" src={Self} />
          </div>
        )}
        <div className={clsx([styles.aboutMe, isMobile && styles.mobile])}>
          <h1 className={clsx([styles.headings, isMobile && styles.mobile])}>Hi, i’m firmansyah!</h1>
          <h2 className={clsx([styles.title, isMobile && styles.mobile])}>
            {!isMobile ? "Software engineer | freelancer" : "Software engineer freelancer"}
          </h2>
          <a
            className={clsx([styles["primary-button"], isMobile && styles.mobile])}
            href="https://www.instagram.com/fyfirman/"
            id="lets-talk-button"
            rel="noreferrer"
            target="_blank"
          >
            Let&apos;s Talk
          </a>
        </div>

        {!isMobile && (
          <div className={styles.photoProfile}>
            <Image alt="Firmansyah Yanuar Photo" id="photo-profile-desktop" src={Self} />
          </div>
        )}
      </div>
      {render3D && (
        <iframe
          className={styles["spline-geo-1"]}
          frameBorder="0"
          id="spline-geo-1"
          src="spline/geometric-1/index.html"
          title="3d-spline-geo-1"
        />
      )}
    </div>
  );
};

export default React.memo(HomeHeader);
