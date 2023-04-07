import Image from "next/image";
import React, { useState } from "react";
import Firmansyah from "@assets/images/firmansyah.png";
import useResponsive from "~/hooks/useResponsive";
import styled from "styled-components";

const Wrapper = styled.div`
  & > span {
    margin: 0;
  }

  &.mobile {
    width: 60%;
    max-width: 280px;
  }
`;

interface PhotoProfileProps {
  className?: string;
}

const PhotoProfile = ({ className }: PhotoProfileProps) => {
  const { isMobile } = useResponsive();
  const [hueRotate, setHueRotate] = useState(0);

  return (
    <Wrapper
      className={className}
      onMouseDown={() => {
        if (isMobile) {
          setHueRotate((prev) => prev + 30);
        }
      }}
      onMouseMove={() => {
        setHueRotate((prev) => prev + 5);
      }}
      style={{ filter: `hue-rotate(${hueRotate}deg)` }}
    >
      <Image
        alt="Firmansyah Yanuar Photo"
        id="photo-profile-desktop"
        priority={!isMobile}
        src={Firmansyah}
        width="420"
      />
    </Wrapper>
  );
};

export default PhotoProfile;
