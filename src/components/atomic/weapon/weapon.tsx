import React, { LegacyRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./weapon.module.scss";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";

interface WeaponProps {
  name: string;
}

// eslint-disable-next-line react/display-name
const Weapon = React.forwardRef((props: WeaponProps, ref) => {
  const { name } = props;

  const { isMobile } = useResponsive();

  return (
    <div className={clsx([styles.weapon, isMobile && styles.mobile])} ref={ref as LegacyRef<HTMLDivElement>}>
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
});

export default motion(Weapon, { forwardMotionProps: true });
