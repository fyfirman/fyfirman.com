import { useState } from "react";
import framerExample from "~/components/pages/explore-framer-motion/framer-example";

const FramerMotion: React.FC = () => {
  const [isReversed, setIsReversed] = useState(true);

  return (
    <main style={{ minHeight: "100vh" }}>
      <button onClick={() => setIsReversed((prev) => !prev)}>
        Reverse! ({isReversed ? "Newest to Oldest" : "Oldest to newest"})
      </button>
      {isReversed
        ? framerExample.map((Component, index) => <Component key={index} />).reverse()
        : framerExample.map((Component, index) => <Component key={index} />)}
    </main>
  );
};

export default FramerMotion;
