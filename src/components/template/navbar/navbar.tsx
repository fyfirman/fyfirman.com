import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Desktop, TabletAndBelow } from "../responsive/responsive";
import styles from "./navbar.module.scss";
import MenuHeader from "./components/menu-navbar/menu-navbar";
import useScrollOffset from "~/hooks/useScrollOffset";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers";

const DarkToggler = dynamic(() => import("./components/dark-toggler/dark-toggler"), { ssr: false });
const NavbarMobile = dynamic(() => import("./navbar-mobile"), { ssr: false });

const Navbar = () => {
  const { isMobile } = useResponsive();
  const isShadowVisible = useScrollOffset(20);

  return (
    <header className={clsx([styles.container, isShadowVisible && styles["container-shadow"]])}>
      <div className={clsx([styles.header, isMobile && styles["header-mobile"]])}>
        <Link href="/" passHref>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="fyfirman logo" className={styles.logo} height={36} src="/img/logo.svg" width={42} />
        </Link>
        <Desktop>
          <div className={styles.nav}>
            <MenuHeader link title="Home" to="/" />
            <MenuHeader link title="Message" to="/message" />
            <MenuHeader link title="About" to="/about" />
            <DarkToggler />
          </div>
        </Desktop>
        <TabletAndBelow>
          <NavbarMobile />
        </TabletAndBelow>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
