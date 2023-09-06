"use client";
import Image from "next/image";
import React, { useState } from "react";
import Firmansyah from "@assets/images/firmansyah.png";
import useResponsive from "~/hooks/useResponsive";
import styled from "styled-components";

const Wrapper = styled.div<{ isMobile: boolean }>`
  & > span {
    margin: 0;
  }

  & > img {
    max-width: ${({ isMobile }) => (isMobile ? "280px" : "initial")};
    object-fit: contain;
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
      isMobile={isMobile}
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
        width={!isMobile ? 420 : 280}
      />
    </Wrapper>
  );
};

export default PhotoProfile;
