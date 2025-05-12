import React from "react";
import { Heading1, Paragraph } from "~/components/atomic/typography/typography";
import Sosmed from "~/components/atomic/sosmed/sosmed";
import useResponsive from "~/hooks/useResponsive";

const HomeContact = () => {
  const { isMobile } = useResponsive();

  return (
    <div id="home-contact">
      <Heading1 isMobile={isMobile} style={{ marginTop: 128, marginBottom: 40 }}>
        Get In Touch With Me
      </Heading1>
      <div className="max-w-[600px]">
        <Paragraph isMobile={isMobile}>
          I&apos;m very happy to share knowledge. If you want to ask something about IT, productivity, or my college
          experience, feel free to discuss via <b>Instagram</b>.
        </Paragraph>
        <Paragraph isMobile={isMobile}>
          For <b>hiring, business, or collaboration</b> please contact me via <b>email (fyfirman@gmail.com)</b> or{" "}
          <b>Linkedin</b>.
        </Paragraph>
      </div>
      <div className="flex items-center justify-center my-[128px]" id="contact-section">
        <Sosmed href="https://instagram.com/fyfirman" name="Instagram" position="left" />
        <Sosmed href="https://github.com/fyfirman" name="Github" position="left" />
        <Sosmed href="mailto:fyfirman@gmail.com" isMiddle name="Email" position="top" />
        <Sosmed href="https://www.linkedin.com/in/fyfirman/" isMiddle name="LinkedIn" position="bottom" />
        <Sosmed href="https://www.youtube.com/channel/UC2KC2T2XtzkG-IQs3MItv5Q" name="Youtube" position="right" />
        <Sosmed href="https://fyfirman.medium.com" name="Medium" position="right" />
      </div>
    </div>
  );
};

export default React.memo(HomeContact);
