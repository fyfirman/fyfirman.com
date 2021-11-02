import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import MenuHeader from "./components/menu-header/menu-header";
import DarkToggler from "./components/darkToggler/darkToggler";
import Logo from "../../../images/logo.svg";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Link href="/" passHref>
          <div className={styles.logo}>
            <Image src={Logo} alt="fyfirman.com" />
          </div>
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

export default Header;
