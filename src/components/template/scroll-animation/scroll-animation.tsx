import React, { useEffect, useRef } from "react";
import { createDomMotionComponent, HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { useInView, IntersectionOptions } from "react-intersection-observer";
import { HTMLElements } from "framer-motion/types/render/html/supported-elements";

interface ScrollAnimationProps extends HTMLMotionProps<"div"> {
  intersectionOptions?: IntersectionOptions;
  animateOnce?: boolean;
  as?: HTMLElements;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  intersectionOptions,
  animateOnce = true,
  ...rest
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView(intersectionOptions);
  const isAnimate = useRef(false);

  useEffect(() => {
    if (animateOnce && isAnimate.current) {
      return;
    }
    if (inView) {
      controls.set("temp");
      void controls.start("visible");
      isAnimate.current = true;
    }
  }, [animateOnce, controls, inView]);

  return (
    <motion.div animate={controls} as="" initial="initial" ref={ref} {...rest}>
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
