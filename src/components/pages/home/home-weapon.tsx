import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Weapon } from "~/components/atomic";
import useResponsive from "~/hooks/useResponsive";
import { primaryWeapon, secondaryWeapon } from "~/data/weapon-list";
import styled, { css } from "styled-components";
import { Heading1 } from "~/components/atomic/typography/typography";
import type { StyledComponentProps } from "~/interfaces/styled-component";

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

const WeaponType = styled(motion.h3)<StyledComponentProps>`
  font-size: 30px;
  font-weight: 700;
  margin-top: 16px;
  text-align: center;
  letter-spacing: -0.025em;
  text-transform: none;
  color: var(--text-headings);
  font-family: var(--base-font);
  margin-bottom: ${({ isMobile }) => (!isMobile ? "36px" : "16px")};

  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 24px;
    `}
`;

const WeaponContainer = styled(motion.div)<StyledComponentProps>`
  display: flex;
  width: 100%;
  flex-direction: row;

  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      margin-top: 36px;
      gap: 48px;
    `}
`;

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
      <Heading1
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -100, opacity: 0 }}
        isMobile={isMobile}
        style={{ marginBottom: 40 - 16 }}
        transition={{ duration: 1 }}
      >
        My Weapons
      </Heading1>
      <WeaponContainer isMobile={isMobile}>
        {[
          { name: "Primary", data: primaryWeapon },
          { name: "Secondary", data: secondaryWeapon },
        ].map((weaponData, index) => (
          <div key={weaponData.name} style={{ flex: 1 }}>
            <WeaponType
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: index === 0 ? -250 : 250, opacity: 0 }}
              isMobile={isMobile}
              transition={{ ease: "anticipate", duration: 0.75, delay: 0.75 }}
            >
              {weaponData.name}
            </WeaponType>
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
      </WeaponContainer>
    </div>
  );
};

export default React.memo(HomeWeapon);
