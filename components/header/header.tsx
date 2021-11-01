import React from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import MenuHeader from "./menu-header/menu-header";
// import DarkToggler from "./darkToggler/darkToggler"
import Logo from "../../images/logo.svg";
import Image from "next/image";

const Header = () => (
  <header>
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" passHref className={styles.logo}>
          <Image src={Logo} alt="fyfirman.com" />
        </Link>
        <div className={styles.nav}>
          <MenuHeader to="project-section" title="Project" />
          <MenuHeader to="contact-section" title="Contact" />
          {/* <DarkToggler /> */}
        </div>
      </div>
    </div>
  </header>
);

export default Header;
