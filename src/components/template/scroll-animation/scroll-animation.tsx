/* eslint-disable import/no-unresolved */
/* eslint-disable react/display-name */
import React, { useEffect, useRef } from "react";
import { HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { useInView, IntersectionOptions } from "react-intersection-observer";
import type { DOMMotionComponents } from "framer-motion";

const Component = React.forwardRef<unknown, { element: keyof DOMMotionComponents } & HTMLMotionProps<any>>(
  ({ element, children, ...rest }, ref) => React.createElement(element, { ref, ...rest }, children),
);

const MotionComponent = motion(Component);

interface ScrollAnimationProps extends HTMLMotionProps<"div"> {
  intersectionOptions?: IntersectionOptions;
  animateOnce?: boolean;
  element?: keyof DOMMotionComponents;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  intersectionOptions,
  animateOnce = true,
  element = "div",
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
    <MotionComponent animate={controls} element={element} initial="initial" ref={ref} {...rest}>
      {children}
    </MotionComponent>
  );
};

export default ScrollAnimation;
