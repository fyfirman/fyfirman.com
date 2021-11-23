import React from "react";
import styles from "~/styles/Home.module.scss";
import { Weapon } from "~/components/atomic";

interface IWeaponList {
  firstRow: string[];
  secondRow: string[];
  [key: string]: string[];
}

const primaryWeapon: Readonly<IWeaponList> = {
  firstRow: ["React", "NodeJS", "Git", "Figma"],
  secondRow: ["MongoDB", "MySQL", "Ubuntu Server"],
};

const secondaryWeapon: Readonly<IWeaponList> = {
  firstRow: ["Laravel", "Docker", "CodeIginiter"],
  secondRow: ["Java", "Python"],
};

const HomeWeapon = () => {
  return (
    <>
      <h2 className={styles.headings2}>My Weapons</h2>
      <div className={styles.weaponContainer}>
        <div style={{ flex: 1 }}>
          <h3 className={styles.weaponType}>Primary</h3>
          {Object.keys(primaryWeapon).map((key) => (
            <div key={`primary-${key}`} style={{ display: "flex", justifyContent: "center" }}>
              {primaryWeapon[key].map((name: string) => (
                <Weapon key={name} name={name} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3 className={styles.weaponType}>Secondary</h3>
          {Object.keys(secondaryWeapon).map((key) => (
            <div key={`secondary-${key}`} style={{ display: "flex", justifyContent: "center" }}>
              {secondaryWeapon[key].map((name: string) => (
                <Weapon key={name} name={name} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeWeapon;
