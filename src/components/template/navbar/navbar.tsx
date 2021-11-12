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
          <img
            alt="fyfirman logo"
            className={styles.logo}
            src="/img/logo.svg"
          />
        </Link>
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
      </div>
    </header>
  );
};

export default Navbar;
