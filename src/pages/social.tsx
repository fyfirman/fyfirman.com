import React from "react";

import PhotoProfile from "~/components/atomic/photo-profile/photo-profile";
import styled from "styled-components";
import Image, { ImageProps } from "next/image";
import env from "~/utils/environment";
import { GetServerSideProps } from "next";
import useAppDarkMode from "~/hooks/useAppDarkMode";

interface SocialProps {
  phoneNumber?: string;
}

const Container = styled.div`
  color: var(--text-body);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
`;

const AboutMe = styled.div`
  text-align: center;
`;

const SocialContainer = styled.div<{
  darkMode: boolean;
}>`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: start;
  width: 100%;
  gap: 16px;

  & img {
    ${(props) => (props.darkMode ? `filter: invert(100%)` : ``)}
  }
`;
const SocialItem = styled.a`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SocialLogo = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Social: React.FC<SocialProps> = ({ phoneNumber }) => {
  const [isDarkModeActive] = useAppDarkMode();

  return (
    <Container>
      <PhotoProfile />
      <h1>Firmansyah Yanuar</h1>
      <AboutMe>
        Passionate software engineer with experience in React for 3 years and building backend application at scale
      </AboutMe>
      <SocialContainer darkMode={isDarkModeActive}>
        <SocialItem href="https://autobahn-security.com/" target="_blank">
          <SocialLogo>
            <Image
              alt="Job fulltime Icon"
              src={require(`@assets/images/icon/job.svg`) as ImageProps["src"]}
              width={16}
            />
          </SocialLogo>
          <span>
            Fulltime at <b>Autobahn Security</b>
          </span>
        </SocialItem>
        <SocialItem href="#">
          <SocialLogo>
            <Image alt="Job Icon" src={require(`@assets/images/icon/job.svg`) as ImageProps["src"]} width={16} />
          </SocialLogo>
          <span>Available for freelance</span>
        </SocialItem>
        {phoneNumber ? (
          <SocialItem href={`https://wa.me/${phoneNumber.replace("+", "")}`} target="_blank">
            <SocialLogo>
              <Image
                alt="Whatsapp Icon"
                src={require(`@assets/images/sosmed/whatsapp.svg`) as ImageProps["src"]}
                width={16}
              />
            </SocialLogo>
            <span>{phoneNumber}</span>
          </SocialItem>
        ) : null}
        <SocialItem href="https://x.com/fyfirman" target="_blank">
          <SocialLogo>
            <Image alt="X Icon" src={require(`@assets/images/sosmed/x.svg`) as ImageProps["src"]} width={16} />
          </SocialLogo>
          <span>@fyfirman</span>
        </SocialItem>
        <SocialItem href="https://github.com/fyfirman" target="_blank">
          <SocialLogo>
            <Image
              alt="Github Icon"
              src={require(`@assets/images/sosmed/github.svg`) as ImageProps["src"]}
              width={16}
            />
          </SocialLogo>
          <span>github.com/fyfirman</span>
        </SocialItem>
        <SocialItem href="https://www.linkedin.com/in/fyfirman/" target="_blank">
          <SocialLogo>
            <Image
              alt="Linkedin Icon"
              src={require(`@assets/images/sosmed/linkedin-black.svg`) as ImageProps["src"]}
              width={16}
            />
          </SocialLogo>
          <span>linkedin.com/in/fyfirman</span>
        </SocialItem>
      </SocialContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;

  if (env.serverSide.allowedRef.includes(query.ref as string)) {
    return { props: { phoneNumber: env.serverSide.phoneNumber } };
  }

  return { props: { phoneNumber: "" } };
};
export default Social;
