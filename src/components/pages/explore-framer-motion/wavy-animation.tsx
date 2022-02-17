import { motion, MotionStyle, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "~/components/atomic";
import Select from "~/components/atomic/select/select";

const boxStyle: MotionStyle = {
  backgroundColor: "black",
  color: "white",
  width: 50,
  height: 50,
};

type CustomOption = {
  delayCustom: number;
  easeCustom: string;
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
  standby: ({ delayCustom, easeCustom }: CustomOption) => ({
    scale: [1, 1.5, 1],
    transition: {
      ease: easeCustom,
      duration: 1.5,
      delay: delayCustom,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 1,
    },
  }),
};

const easingOptions = [
  { value: "linear" },
  { value: "easeIn" },
  { value: "easeOut" },
  { value: "easeInOut" },
  { value: "circIn" },
  { value: "circOut" },
  { value: "circInOut" },
  { value: "backIn" },
  { value: "backOut" },
  { value: "backInOut" },
  { value: "anticipate" },
];

const WavyAnimation: React.FC = () => {
  const boxControls = useAnimation();

  const [reset, setReset] = useState(false);
  const [easeOption, setEaseOption] = useState("easeInOut");

  useEffect(() => {
    boxControls.set("hidden");
    void boxControls.start("visible");
    setTimeout(() => {
      void boxControls.start("standby");
    }, 500);
  }, [boxControls, reset]);

  useEffect(() => {
    void boxControls.start("standby");
  }, [easeOption]);

  return (
    <div>
      <h1>Wavy Animation</h1>
      <Select
        onChange={(e) => {
          setEaseOption(e.target.value);
        }}
        options={easingOptions}
        style={{ marginBottom: 50 }}
      />
      <motion.div style={{ display: "flex", gap: 40, flexDirection: "row", marginBottom: 20, height: 200 }}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <motion.div
              key={index}
              animate={boxControls}
              custom={{ delayCustom: index * 0.2, easeCustom: easeOption } as CustomOption}
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
