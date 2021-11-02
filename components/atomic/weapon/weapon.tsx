import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./weapon.module.scss";

interface WeaponProps {
  name: string;
  color?: string;
}

const Weapon = (props: WeaponProps) => {
  const { name, color } = props;
  const imageURI = require(`../../../images/stack/${name.toLowerCase().split(" ").join("-")}.svg`);

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setTheme(localStorage.getItem("theme"));
  }, []);

  return (
    <div className={styles.weapon}>
      <div className={styles.weaponImage}>
        <Image
          src={imageURI}
          alt={name}
          // @ts-ignore
          style={theme === "dark" ? { outline: `1px solid ${color}` } : {}}
        />
      </div>
      <span className={styles.tooltip} data-hover={name}>
        {name}
      </span>
    </div>
  );
};

export default Weapon;
