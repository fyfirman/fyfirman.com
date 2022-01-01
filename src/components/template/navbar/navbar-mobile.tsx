import React, { memo, useCallback, useState } from "react";
import Image from "next/image";
import MenuOutline from "@assets/images/menu-outline.svg";
import CloseOutline from "@assets/images/close-outline.svg";
import dynamic from "next/dynamic";
import styles from "./navbar.module.scss";
import Button from "~/components/atomic/button";

const MobileMenuModal = dynamic(() => import("~/components/modal/mobile-menu-modal"), { ssr: false });
const NavbarMobile = () => {
  const [isMobileVisible, setIsMobileMenuVisible] = useState(false);
  const toggleMenuMobile = useCallback(() => setIsMobileMenuVisible((prev) => !prev), []);

  return (
    <>
      <Button className={styles["menu-button"]} onClick={toggleMenuMobile}>
        <Image
          alt="Menu Icon"
          className={styles["menu-icon"]}
          height={36}
          src={isMobileVisible ? (CloseOutline as string) : (MenuOutline as string)}
          width={36}
        />
      </Button>
      <MobileMenuModal onClose={toggleMenuMobile} visible={isMobileVisible} />
    </>
  );
};

export default memo(NavbarMobile);
