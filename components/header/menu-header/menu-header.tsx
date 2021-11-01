import { Link } from "react-scroll";
import styles from "./menu-header.module.scss";

interface MenuHeaderProps {
  to: string;
  title: string;
}

const MenuHeader = ({ to, title }: MenuHeaderProps) => (
  <Link
    to={to}
    spy={true}
    smooth={true}
    offset={-100}
    duration={500}
    className={styles.button}
    data-hover={title}
  >
    <span>{title}</span>
  </Link>
);

export default MenuHeader;
