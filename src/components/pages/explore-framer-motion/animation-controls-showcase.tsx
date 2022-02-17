import { motion, MotionStyle, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "~/components/atomic";

const boxStyle: MotionStyle = {
  backgroundColor: "black",
  color: "white",
  width: 100,
  height: 100,
  margin: 50,
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
  standby: {
    rotate: 360,
    transition: {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const AnimationControlsShowcase: React.FC = () => {
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
      <h1>Animation Controls Showcase</h1>
      <motion.div style={{ display: "flex", gap: 20, flexDirection: "column", alignItems: "flex-start" }}>
        <motion.div
          animate={boxControls}
          initial="hidden"
          style={boxStyle}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
          variants={variants}
        />
        <Button onClick={() => setReset(!reset)} variant="primary">
          Reset
        </Button>
      </motion.div>
    </div>
  );
};

export default AnimationControlsShowcase;
