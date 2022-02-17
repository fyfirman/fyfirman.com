import { motion, MotionStyle, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "~/components/atomic";

const boxStyle: MotionStyle = {
  backgroundColor: "black",
  color: "white",
  width: 50,
  height: 50,
};

const variants: Variants = {
  hidden: { scale: 0, rotate: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.75,
      ease: "anticipate",
    },
  },
  standby: (delayCustom: number) => ({
    scale: [1, 1.5, 1],
    transition: {
      ease: "easeInOut",
      duration: 1.5,
      delay: delayCustom,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 1,
    },
  }),
};

const WavyAnimation: React.FC = () => {
  const boxControls = useAnimation();

  const [reset, setReset] = useState(false);

  useEffect(() => {
    console.log("executed");
    boxControls.set("hidden");
    void boxControls.start("visible");
    setTimeout(() => {
      void boxControls.start("standby");
    }, 500);
  }, [boxControls, reset]);

  return (
    <div>
      <h1>Wavy Animation</h1>
      <motion.div style={{ display: "flex", gap: 40, flexDirection: "row", marginBottom: 20, height: 200 }}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <motion.div
              key={index}
              animate={boxControls}
              custom={index * 0.2}
              initial="hidden"
              style={boxStyle}
              variants={variants}
            />
          ))}
      </motion.div>
      <Button onClick={() => setReset(!reset)} variant="primary">
        Reset
      </Button>
    </div>
  );
};

export default WavyAnimation;
