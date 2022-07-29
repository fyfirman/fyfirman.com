import { motion, MotionStyle, useAnimation } from "framer-motion";
import { useState } from "react";

const boxStyle: MotionStyle = {
  padding: 20,
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
};

const AnimationControlsExample: React.FC = () => {
  const [x, setX] = useState(0);
  const [x2, setX2] = useState(0);

  const controls = useAnimation();
  const controlsSet = useAnimation();

  return (
    <div>
      <h1>AnimationControlsExample</h1>
      <motion.div style={{ display: "flex", gap: 20, flexDirection: "column", alignItems: "flex-start" }}>
        <p>
          <ul>
            <li>
              <code>controls.start</code> : with transition
            </li>
            <li>
              <code>controls.set</code> : <b>instantly</b>, no transition
            </li>
          </ul>
        </p>
        <motion.div
          animate={controls}
          onClick={() => {
            void controls.start({
              x: x + 50,
            });
            setX(x + 50);
          }}
          style={boxStyle}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          Start
        </motion.div>
        <motion.div
          animate={controlsSet}
          onClick={() => {
            controlsSet.set({
              x: x2 + 50,
            });
            setX2(x2 + 50);
          }}
          style={boxStyle}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          Set
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimationControlsExample;
