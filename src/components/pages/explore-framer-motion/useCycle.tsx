import { motion, MotionStyle, useCycle } from "framer-motion";

const boxStyle: MotionStyle = {
  padding: 20,
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
};

const UseCycle: React.FC = () => {
  const [x, cycleX] = useCycle(0, 50, 100);
  return (
    <div>
      <h1>UseCycle</h1>
      <motion.div style={{ display: "flex", gap: 20, flexDirection: "column", alignItems: "flex-start" }}>
        <motion.button animate={{ x }} onTap={() => cycleX()} style={boxStyle}>
          Click me (x: {x})
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UseCycle;
