import React from "react"
import { Link } from "gatsby"

import * as styles from "./header.styles"
import MenuHeader from "./menu-header/menu-header"
import DarkToggler from "../darkToggler/darkToggler"
import Logo from "../../images/logo.svg"

const Header = () => (
  <header>
    <div style={styles.root}>
      <div style={styles.header}>
        <Link to="/">
          <object type="image/svg+xml" data={Logo} style={styles.logo}>
            fyfirman.tech
          </object>
        </Link>
        <div style={styles.nav}>
          <MenuHeader
            to="project-section"
            title="Project"
          />
          <MenuHeader
            to="contact-section"
            title="Contact"
          />
          <DarkToggler />
        </div>
      </div>
    </div>
  </header>
);


export default Header
