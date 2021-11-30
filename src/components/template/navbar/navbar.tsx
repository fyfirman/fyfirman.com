import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import MenuOutline from "@assets/images/menu-outline.svg";
import CloseOutline from "@assets/images/close-outline.svg";
import { Desktop, TabletAndBelow } from "../responsive/responsive";
import styles from "./navbar.module.scss";
import MenuHeader from "./components/menu-navbar/menu-navbar";
import DarkToggler from "./components/dark-toggler/dark-toggler";
import { useTabletAndBelowMediaQuery } from "~/hooks/useAppMediaQuery";
import { clsx } from "~/helpers";
import { useScrollOffset } from "~/hooks";
import { Button } from "~/components/atomic";
import { MobileMenuModal } from "~/components/modal";

const Navbar = () => {
  const router = useRouter();
  const isMobile = useTabletAndBelowMediaQuery();
  const isShadowVisible = useScrollOffset(20);
  const [isMobileVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMenuMobile = useCallback(() => setIsMobileMenuVisible((prev) => !prev), []);

  return (
    <header className={clsx([styles.container, isShadowVisible && styles["container-shadow"]])}>
      <div className={clsx([styles.header, isMobile && styles["header-mobile"]])}>
        <Link href="/" passHref>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="fyfirman logo" className={styles.logo} height={36} src="/img/logo.svg" width={42} />
        </Link>
        <Desktop>
          <div className={styles.nav}>
            {
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition -- will be replaced with firebase remote config
              !router.pathname.includes("message") && false ? (
                <>
                  <MenuHeader title="Project" to="project-section" />
                  <MenuHeader title="Contact" to="contact-section" />
                  <MenuHeader link title="Message" to="/message" />
                </>
              ) : (
                <>
                  <MenuHeader link title="Home" to="/" />
                  <MenuHeader link title="Message" to="/message" />
                  <MenuHeader link title="About" to="/about" />
                </>
              )
            }
            <DarkToggler />
          </div>
        </Desktop>
        <TabletAndBelow>
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
        </TabletAndBelow>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
