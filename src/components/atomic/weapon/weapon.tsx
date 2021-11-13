import React, { memo } from "react";
import Image from "next/image";
import styles from "./weapon.module.scss";

interface WeaponProps {
  name: string;
}

const Weapon = (props: WeaponProps) => {
  const { name } = props;

  return (
    <div className={styles.weapon}>
      <div className={styles.weaponImage}>
        <Image
          alt={`${name} Logo`}
          // Cannot resolve how to dynamically import with typescript
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={require(`../../../assets/images/stack/${name.toLowerCase().split(" ").join("-")}.svg`)}
        />
      </div>
      <span className={styles.tooltip} data-hover={name}>
        {name}
      </span>
    </div>
  );
};

export default memo(Weapon);
