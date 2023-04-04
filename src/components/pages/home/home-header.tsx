import React from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { useDarkMode } from "next-dark-mode";
import styles from "~/styles/Home.module.scss";
import { clsx } from "~/helpers/classname-helper";
import useResponsive from "~/hooks/useResponsive";
import env from "~/utils/environment";
import PhotoProfile from "~/components/atomic/photo-profile/photo-profile";
import styled from "styled-components";
import type { StyledComponentProps } from "~/interfaces/styled-component";

const variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const Header = styled(motion.h1)<StyledComponentProps>`
  font-family: var(--base-font);
  font-weight: 800;
  font-size: 48px;
  letter-spacing: -0.035em;
  color: var(--text-headings);
  margin: 0;
`;

const SubHeader = styled(motion.span)<StyledComponentProps>`
  font-family: var(--base-font);
  font-weight: 500;
  font-size: 18.3375px;
  color: var(--text-headings);
  letter-spacing: -0.025em;
  margin-bottom: ${({ isMobile }) => (!isMobile ? "0" : "16px")};
  margin-top: ${({ isMobile }) => (!isMobile ? "0" : "8px")};
  text-align: ${({ isMobile }) => (!isMobile ? "left" : "center")};
`;

const HomeHeader = () => {
  const { isMobile } = useResponsive();
  const { darkModeActive } = useDarkMode();
  const render3D = useMediaQuery({
    query: "(min-device-width: 1080px)",
  });

  return (
    <div className={styles["header-container"]} id="home-header">
      <div className={clsx([styles.jumbotron, isMobile && styles.mobile])}>
        <PhotoProfile />
        <div className={clsx([styles.aboutMe, isMobile && styles.mobile])}>
          <SubHeader
            animate="visible"
            initial="hidden"
            isMobile={isMobile}
            transition={{ ease: "anticipate", duration: 0.75, delay: 0.25 }}
            variants={variants}
          >
            Hi, I am
          </SubHeader>
          <Header
            animate="visible"
            initial="hidden"
            isMobile={isMobile}
            transition={{ ease: "anticipate", duration: 0.5, delay: 0.5 }}
            variants={variants}
          >
            Firmansyah Yanuar
          </Header>
          <SubHeader
            animate="visible"
            initial="hidden"
            isMobile={isMobile}
            transition={{ ease: "anticipate", duration: 0.75, delay: 0.25 }}
            variants={variants}
          >
            {!isMobile ? "I love to build something cool software" : "I love to build something cool software"}
          </SubHeader>
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1.1 }}
            initial="hidden"
            style={{ width: "fit-content" }}
            transition={{
              opacity: { ease: "anticipate", duration: 1 },
              y: { ease: "anticipate", duration: 1 },
              scale: { repeat: Infinity, repeatType: "mirror", duration: 1.5 },
            }}
            variants={variants}
            whileHover={{ scale: 1.2, transition: { duration: 0.5, type: "spring", stiffness: 150 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.25, type: "spring", stiffness: 120 } }}
          >
            <motion.a
              animate={{ backgroundColor: darkModeActive ? "#ffffff" : "hsla(0, 0%, 0%, 0.851)" }}
              className={clsx([styles["primary-button"], isMobile && styles.mobile])}
              href="https://www.instagram.com/fyfirman/"
              id="lets-talk-button"
              rel="noreferrer"
              target="_blank"
              whileHover={{
                backgroundColor: ["#b721ff", "#21d4fd"],
                transition: { repeat: Infinity, repeatType: "mirror", duration: 1 },
              }}
              whileTap={{
                backgroundColor: ["#b721ff", "#21d4fd"],
                transition: { repeat: Infinity, repeatType: "mirror", duration: 0.3 },
              }}
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        </div>
      </div>
      {!env.disableSpline && render3D ? (
        <motion.iframe
          animate={{ x: 0, y: 0, opacity: 1 }}
          className={styles["spline-geo-1"]}
          frameBorder="0"
          id="spline-geo-1"
          initial={{ x: 20, y: 20, opacity: 0 }}
          loading="lazy"
          src="spline/geometric-1/index.html"
          title="3d-spline-geo-1"
          transition={{
            duration: 1,
            delay: 1.5,
            x: { repeat: Infinity, repeatType: "mirror", duration: 5 },
            y: { repeat: Infinity, repeatType: "mirror", duration: 3 },
          }}
        />
      ) : null}
    </div>
  );
};

export default React.memo(HomeHeader);
