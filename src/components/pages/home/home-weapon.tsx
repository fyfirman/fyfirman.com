import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "~/styles/Home.module.scss";
import { Weapon } from "~/components/atomic";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";
import { primaryWeapon, secondaryWeapon } from "~/data/weapon-list";

const getContainerAnimation = (inverse: boolean): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      staggerDirection: inverse ? -1 : 1,
      delayChildren: 1,
      duration: 0.3,
    },
  },
});

const getItemAnimation = (inverse: boolean): Variants => ({
  hidden: { x: inverse ? -250 : 250, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
});

const HomeWeapon = () => {
  const { isMobile } = useResponsive();

  return (
    <div id="home-weapon">
      <motion.h2
        animate={{ y: 0, opacity: 1 }}
        className={styles.headings2}
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        My Weapons
      </motion.h2>
      <motion.div className={styles.weaponContainer}>
        {[
          { name: "Primary", data: primaryWeapon },
          { name: "Secondary", data: secondaryWeapon },
        ].map((weaponData, index) => (
          <div key={weaponData.name} style={{ flex: 1 }}>
            <motion.h3
              animate={{ x: 0, opacity: 1 }}
              className={clsx([styles.weaponType, isMobile && styles.mobile])}
              initial={{ x: index === 0 ? -250 : 250, opacity: 0 }}
              transition={{ ease: "anticipate", duration: 0.75, delay: 0.5 }}
            >
              {weaponData.name}
            </motion.h3>
            {Object.keys(weaponData.data).map((key) => (
              <motion.div
                key={`${weaponData.name}-${key}`}
                animate="show"
                initial="hidden"
                style={{ display: "flex", justifyContent: "center" }}
                variants={getContainerAnimation(index === 0)}
              >
                {weaponData.data[key].map((name: string) => (
                  <Weapon key={name} name={name} variants={getItemAnimation(index === 0)} />
                ))}
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default React.memo(HomeWeapon);
