import { Variants } from "framer-motion";

export const headerVariants: Variants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  temp: {
    y: 150,
  },
  visible: {
    y: 0,
    opacity: [0, 1],
    transition: {
      ease: "anticipate",
      duration: 0.75,
    },
  },
};
