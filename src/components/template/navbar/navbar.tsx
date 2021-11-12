import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import MenuOutline from "@assets/images/menu-outline.svg";
import { Desktop, TabletAndBelow } from "../responsive/responsive";
import styles from "./navbar.module.scss";
import MenuHeader from "./components/menu-navbar/menu-navbar";
import DarkToggler from "./components/dark-toggler/dark-toggler";
import { useTabletAndBelowMediaQuery } from "~/hooks/useAppMediaQuery";
import { clsx } from "~/helpers";
import { useScrollOffset } from "~/hooks";
import { Button } from "~/components/atomic";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const isMobile = useTabletAndBelowMediaQuery();
  const isShadowVisible = useScrollOffset(20);

  return (
    <header
      className={clsx([
        styles.container,
        isShadowVisible && styles["container-shadow"],
      ])}
    >
      <div
        className={clsx([styles.header, isMobile && styles["header-mobile"]])}
      >
        <Link href="/" passHref>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="fyfirman logo"
            className={styles.logo}
            src="/img/logo.svg"
          />
        </Link>
        <Desktop>
          <div className={styles.nav}>
            {!router.pathname.includes("message") ? (
              <>
                <MenuHeader title="Project" to="project-section" />
                <MenuHeader title="Contact" to="contact-section" />
                <MenuHeader link title="Message" to="/message" />
              </>
            ) : (
              <>
                <MenuHeader link title="Home" to="/" />
                <MenuHeader link title="Message" to="/message" />
              </>
            )}
            <DarkToggler />
          </div>
        </Desktop>
        <TabletAndBelow>
          <Button className={styles["menu-button"]} onClick={onMenuClick}>
            <Image
              alt="Menu Icon"
              className={styles["menu-icon"]}
              height={36}
              src={MenuOutline as string}
              width={36}
            />
          </Button>
        </TabletAndBelow>
      </div>
    </header>
  );
};

export default Navbar;
