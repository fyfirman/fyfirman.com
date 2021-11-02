import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./weapon.module.scss";

interface WeaponProps {
  name: string;
}

const Weapon = (props: WeaponProps) => {
  const { name } = props;
  const imageURI = require(`../../../assets/images/stack/${name
    .toLowerCase()
    .split(" ")
    .join("-")}.svg`);

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setTheme(localStorage.getItem("theme"));
  }, []);

  return (
    <div className={styles.weapon}>
      <div className={styles.weaponImage}>
        <Image src={imageURI} alt={name} />
      </div>
      <span className={styles.tooltip} data-hover={name}>
        {name}
      </span>
    </div>
  );
};

export default Weapon;
