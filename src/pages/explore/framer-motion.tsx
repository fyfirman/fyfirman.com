import framerExample from "~/components/pages/explore-framer-motion/framer-example";

const FramerMotion: React.FC = () => {
  return (
    <main style={{ minHeight: "100vh" }}>
      {framerExample.map((Component, index) => (
        <Component key={index} />
      ))}
    </main>
  );
};

export default FramerMotion;
