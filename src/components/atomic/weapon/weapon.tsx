import React, { memo } from "react";
import Image from "next/image";
import styles from "./weapon.module.scss";
import { useResponsive } from "~/hooks";
import { clsx } from "~/helpers";

interface WeaponProps {
  name: string;
}

const Weapon = (props: WeaponProps) => {
  const { name } = props;

  const { isMobile } = useResponsive();

  return (
    <div className={clsx([styles.weapon, isMobile && styles.mobile])}>
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
