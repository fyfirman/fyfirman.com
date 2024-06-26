import React from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "next-dark-mode";
import useResponsive from "~/hooks/useResponsive";
import PhotoProfile from "~/components/atomic/photo-profile/photo-profile";
import styled, { css } from "styled-components";
import type { StyledComponentProps } from "~/interfaces/styled-component";
import { GOLDEN_RATIO, WRAPPER_WIDTH } from "~/helpers/constants";
import env from "~/utils/environment";
import PhotoProfileV2 from "~/components/atomic/photo-profile-v2/photo-profile-v2";

const variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const Container = styled.div`
  position: relative;
`;

const MobileContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
`;

const TextContainer = styled.div`
  margin-top: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Header = styled(motion.h1)<StyledComponentProps>`
  margin: 0;
  font-size: 48px;
  font-weight: 800;
  line-height: 66px;
  letter-spacing: -0.035em;
  color: var(--text-headings);
  font-family: var(--base-font);

  ${({ isMobile }) =>
    isMobile &&
    css`
      text-align: center;
      font-size: 36px;
      line-height: 48px;
    `}
`;

const SubHeader = styled(motion.span)<StyledComponentProps>`
  font-weight: 500;
  font-size: 18.3375px;
  font-family: var(--base-font);
  letter-spacing: -0.025em;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  color: var(--text-body); // Text body is different from the design;

  ${({ isMobile }) =>
    isMobile &&
    css`
      text-align: center;
      font-size: 16px;
      line-height: 18px;
    `}
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

const AboutMe = styled(motion.div)<StyledComponentProps>`
  flex: 4;
  padding-left: 4%;
  gap: 12px;
  z-index: 2;
`;

const JumboTron = styled(motion.div)<StyledComponentProps>`
  display: flex;
  align-items: center;
  height: ${WRAPPER_WIDTH / GOLDEN_RATIO}px;
  margin-top: calc(${WRAPPER_WIDTH / GOLDEN_RATIO} - 120px) px;

  ${({ isMobile }) =>
    isMobile &&
    css`
      height: initial;
      flex-direction: column;
      margin-top: 10px;
    `}
`;

const description =
  "Experienced Software Engineer with a strong emphasis \n on frontend development, specializing in React for over 3 years";

const HomeHeader = () => {
  const { isMobile } = useResponsive();
  const { darkModeActive } = useDarkMode();

  if (isMobile) {
    return (
      <MobileContainer id="home-header">
        {env.featureFlags.photoProfileV2 ? <PhotoProfileV2 /> : <PhotoProfile />}
        <TextContainer>
          <SubHeader
            animate="visible"
            initial="hidden"
            isMobile
            transition={{ ease: "anticipate", duration: 0.75, delay: 0.25 }}
            variants={variants}
          >
            Hi, I am
          </SubHeader>
          <Header
            animate="visible"
            initial="hidden"
            isMobile
            transition={{ ease: "anticipate", duration: 0.5, delay: 0.5 }}
            variants={variants}
          >
            Firmansyah Yanuar
          </Header>
          <SubHeader
            animate="visible"
            initial="hidden"
            isMobile
            transition={{ ease: "anticipate", duration: 0.75, delay: 0.25 }}
            variants={variants}
          >
            {description}
          </SubHeader>
        </TextContainer>
      </MobileContainer>
    );
  }

  return (
    <Container id="home-header">
      <JumboTron>
        {env.featureFlags.photoProfileV2 ? <PhotoProfileV2 /> : <PhotoProfile />}
        <AboutMe>
          <SubHeader
            animate="visible"
            initial="hidden"
            transition={{ ease: "anticipate", duration: 0.75, delay: 0.25 }}
            variants={variants}
          >
            Hi, I am
          </SubHeader>
          <Header
            animate="visible"
            initial="hidden"
            transition={{ ease: "anticipate", duration: 0.5, delay: 0.5 }}
            variants={variants}
          >
            Firmansyah Yanuar
          </Header>
          <SubHeader
            animate="visible"
            initial="hidden"
            transition={{ ease: "anticipate", duration: 0.75, delay: 0.25 }}
            variants={variants}
          >
            {description}
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
    </Container>
  );
};

export default React.memo(HomeHeader);
