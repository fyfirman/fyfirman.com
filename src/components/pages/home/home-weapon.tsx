import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "~/styles/Home.module.scss";
import { Weapon } from "~/components/atomic";
import useResponsive from "~/hooks/useResponsive";
import { clsx } from "~/helpers/classname-helper";
import { primaryWeapon, secondaryWeapon } from "~/data/weapon-list";

const delayWeapon = 1.25; // in second

const itemAnimation: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: ({ delayCustom }: { delayCustom: number }) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "anticipate",
      delay: delayCustom,
    },
  }),
  standby: ({ delayCustom }: { delayCustom: number }) => ({
    scale: [1, 1.15, 1],
    transition: {
      ease: "easeInOut",
      duration: 1.5,
      delay: delayCustom,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 1,
    },
  }),
  hover: {
    scale: 1,
  },
};

const HomeWeapon = () => {
  const { isMobile } = useResponsive();
  const boxControls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    const isDirectlyView = window.scrollY < 100;
    if (inView) {
      setTimeout(
        () => {
          void boxControls.start("visible");
          void boxControls.start("standby");
        },
        isDirectlyView ? delayWeapon * 1000 : 0,
      );
    }
  }, [boxControls, inView]);

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
              transition={{ ease: "anticipate", duration: 0.75, delay: 0.75 }}
            >
              {weaponData.name}
            </motion.h3>
            {Object.keys(weaponData.data).map((key) => (
              <motion.div
                key={`${weaponData.name}-${key}`}
                ref={ref}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {weaponData.data[key].map((name: string, itemIndex) => (
                  <Weapon
                    key={name}
                    animate={boxControls}
                    custom={{ delayCustom: itemIndex * 0.4 }}
                    initial="hidden"
                    name={name}
                    onHoverEnd={() => boxControls.start("standby")}
                    onHoverStart={() => boxControls.start("hover")}
                    variants={itemAnimation}
                  />
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
