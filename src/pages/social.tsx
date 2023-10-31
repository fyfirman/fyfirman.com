import React from "react";

import PhotoProfile from "~/components/atomic/photo-profile/photo-profile";
import styled from "styled-components";
import Image, { ImageProps } from "next/image";

interface SocialProps {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
`;

const AboutMe = styled.div`
  text-align: center;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: start;
  width: 100%;
  gap: 16px;
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

const Social: React.FC<SocialProps> = (props) => {
  return (
    <Container>
      <PhotoProfile />
      <h1>Firmansyah Yanuar</h1>
      <AboutMe>
        Passionate software engineer with experience in React for 3 years and building backend application at scale
      </AboutMe>
      <SocialContainer>
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
        <SocialItem href="https://wa.me/623362163216" target="_blank">
          <SocialLogo>
            <Image
              alt="Whatsapp Icon"
              src={require(`@assets/images/sosmed/whatsapp.svg`) as ImageProps["src"]}
              width={16}
            />
          </SocialLogo>
          <span>+623362163216</span>
        </SocialItem>
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

export default Social;
