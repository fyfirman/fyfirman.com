import { Link } from "react-scroll";
import NextLink from "next/link";
import styles from "./menu-header.module.scss";

interface MenuHeaderProps {
  to: string;
  title: string;
  link?: boolean;
}

const MenuHeader = (props: MenuHeaderProps) => {
  const { to, title, link = false } = props;

  return link ? (
    <NextLink href={to}>
      <a className={styles.button} data-hover={title}>
        <span>{title}</span>
      </a>
    </NextLink>
  ) : (
    <Link
      to={to}
      spy
      smooth
      offset={-100}
      duration={500}
      className={styles.button}
      data-hover={title}
    >
      <span>{title}</span>
    </Link>
  );
};

export default MenuHeader;
