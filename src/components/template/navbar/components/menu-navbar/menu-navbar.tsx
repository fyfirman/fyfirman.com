import React from "react";
import { Link } from "react-scroll";
import NextLink from "next/link";
import styles from "./menu-navbar.module.scss";

interface MenuNavbarProps {
  to: string;
  title: string;
  link?: boolean;
}

const MenuNavbar = (props: MenuNavbarProps) => {
  const { to, title, link = false } = props;

  return link ? (
    <NextLink className={styles.button} data-hover={title} href={to}>
      <span>{title}</span>
    </NextLink>
  ) : (
    <Link className={styles.button} data-hover={title} duration={500} offset={-100} smooth spy to={to}>
      <span>{title}</span>
    </Link>
  );
};

export default React.memo(MenuNavbar);
