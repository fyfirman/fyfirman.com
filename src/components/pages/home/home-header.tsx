import React from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { useDarkMode } from "next-dark-mode";
import useResponsive from "~/hooks/useResponsive";
import env from "~/utils/environment";
import PhotoProfile from "~/components/atomic/photo-profile/photo-profile";
import styled, { css } from "styled-components";
import type { StyledComponentProps } from "~/interfaces/styled-component";
import { GOLDEN_RATIO, WRAPPER_WIDTH } from "~/helpers/constants";

const variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const Header = styled(motion.h1)<StyledComponentProps>`
  margin: 0;
  font-size: 48px;
  font-weight: 800;
  line-height: 66px;
  letter-spacing: -0.035em;
  color: var(--text-headings);
  font-family: var(--base-font);
`;

const SubHeader = styled(motion.span)<StyledComponentProps>`
  font-weight: 500;
  font-size: 18.3375px;
  font-family: var(--base-font);
  letter-spacing: -0.025em;
  margin-top: ${({ isMobile }) => (!isMobile ? "0" : "8px")};
  margin-bottom: ${({ isMobile }) => (!isMobile ? "0" : "16px")};
  text-align: ${({ isMobile }) => (!isMobile ? "left" : "center")};
  color: var(--text-body); // Text body is different from the design;
`;

const PrimaryButton = styled(motion.a)<StyledComponentProps>`
  border: none;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 24px;
  letter-spacing: 2px;
  color: var(--text-button);
  text-transform: uppercase;
  font-family: var(--base-font);
  background-color: var(--bg-button);
  box-shadow: 0px 0px var(--shadow-ava);

  &:hover {
    cursor: pointer;
  }
`;

const SplineGeoContainer = styled(motion.iframe)`
  position: absolute;
  bottom: -50px;
  right: -200px;
`;

const AboutMe = styled(motion.div)<StyledComponentProps>`
  flex: 4;
  padding-left: 4%;
  z-index: 2;

  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
      flex-direction: column;
      padding-right: 0;
      align-items: center;
    `}
`;

const JumboTron = styled(motion.div)<StyledComponentProps>`
  display: flex;
  align-items: center;
  height: ${WRAPPER_WIDTH / GOLDEN_RATIO}px;
  margin-top: calc(${WRAPPER_WIDTH / GOLDEN_RATIO} - 120px) px;

  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      margin-top: 10px;
    `}
`;

const HomeHeader = () => {
  const { isMobile } = useResponsive();
  const { darkModeActive } = useDarkMode();
  const render3D = useMediaQuery({
    query: "(min-device-width: 1080px)",
  });

  return (
    <div
      id="home-header"
      style={{
        position: "relative",
      }}
    >
      <JumboTron isMobile={isMobile}>
        <PhotoProfile />
        <AboutMe isMobile={isMobile}>
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
            animate={{ opacity: 1, y: 0, scale: 1 }}
            initial="hidden"
            style={{ width: "fit-content", marginTop: "32px" }}
            transition={{
              opacity: { ease: "anticipate", duration: 1 },
              y: { ease: "anticipate", duration: 1 },
              scale: { repeat: Infinity, repeatType: "mirror", duration: 1.5 },
            }}
            variants={variants}
            whileHover={{ scale: 1.2, transition: { duration: 0.5, type: "spring", stiffness: 150 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.25, type: "spring", stiffness: 120 } }}
          >
            <PrimaryButton
              animate={{ backgroundColor: darkModeActive ? "#ffffff" : "hsla(0, 0%, 0%, 0.851)" }}
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
            </PrimaryButton>
          </motion.div>
        </AboutMe>
      </JumboTron>
      {!env.disableSpline && render3D ? (
        <SplineGeoContainer
          animate={{ x: 0, y: 0, opacity: 1 }}
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
