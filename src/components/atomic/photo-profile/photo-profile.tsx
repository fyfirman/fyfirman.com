import Image from "next/image";
import React, { useState } from "react";
import Firmansyah from "@assets/images/firmansyah.png";
import styles from "./photo-profile.module.scss";
import useResponsive from "~/hooks/useResponsive";

const PhotoProfile: React.VFC = () => {
  const { isMobile } = useResponsive();
  const [hueRotate, setHueRotate] = useState(0);

  return (
    <div
      className={styles.photoProfile}
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
      <Image alt="Firmansyah Yanuar Photo" id="photo-profile-desktop" priority={!isMobile} src={Firmansyah} />
    </div>
  );
};

export default PhotoProfile;
