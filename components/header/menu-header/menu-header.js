import React from 'react'
import { Link } from 'react-scroll'
import "./menu-header.scss"

const MenuHeader = ({ to, title }) => (
  <Link
    to={to}
    spy={true}
    smooth={true}
    offset={-100}
    duration={500}
    className="button"
    data-hover={title}>
    <span>{title}</span>
  </Link>
);

export default MenuHeader;