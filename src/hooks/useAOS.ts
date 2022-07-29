import { useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";

type AosConfig = IntersectionOptions & {
  animateOnce?: boolean;
};

export const useAOS = (config?: AosConfig) => {
  const { animateOnce, ...rest } = config ?? { animateOnce: true };

  const controls = useAnimation();
  const { ref, inView } = useInView(rest);
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

  return { ref, controls };
};
