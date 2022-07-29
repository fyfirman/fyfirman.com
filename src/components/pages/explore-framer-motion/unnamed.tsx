import { motion, MotionStyle } from "framer-motion";

const boxStyle: MotionStyle = {
  padding: 20,
  backgroundColor: "black",
  color: "white",
};

const variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const Unnamed: React.FC = () => {
  return (
    <div>
      <h1>Unnamed</h1>
      <motion.div style={{ display: "flex", gap: 20, flexDirection: "column", alignItems: "flex-start" }}>
        <motion.div
          animate="visible"
          initial="hidden"
          style={boxStyle}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}
          variants={variants}
        >
          1
        </motion.div>
        <motion.div
          animate="visible"
          initial="hidden"
          style={boxStyle}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.25 }}
          variants={variants}
        >
          2
        </motion.div>
        <motion.div
          animate="visible"
          initial="hidden"
          style={boxStyle}
          transition={{ ease: "easeInOut", duration: 1 }}
          variants={variants}
        >
          3
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unnamed;
