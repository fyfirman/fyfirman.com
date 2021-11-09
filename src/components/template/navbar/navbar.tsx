import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import MenuHeader from "./components/menu-navbar/menu-navbar";
import DarkToggler from "./components/dark-toggler/dark-toggler";

const Navbar = () => {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Link href="/" passHref>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logo} src="/img/logo.svg" alt="fyfirman logo" />
        </Link>
        <div className={styles.nav}>
          {!router.pathname.includes("message") ? (
            <>
              <MenuHeader to="project-section" title="Project" />
              <MenuHeader to="contact-section" title="Contact" />
              <MenuHeader to="/message" title="Message" link />
            </>
          ) : (
            <>
              <MenuHeader to="/" title="Home" link />
              <MenuHeader to="/message" title="Message" link />
            </>
          )}
          <DarkToggler />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
