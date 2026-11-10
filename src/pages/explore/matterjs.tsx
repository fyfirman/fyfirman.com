import Head from "@components/template/head";
import { CanvasOptions, useCanvas } from "~/components/pages/explore-matterjs/matterjs";

const canvas: CanvasOptions = {
  height: 600,
  width: 800,
};

const margin = 1.05;

const MatterJs: React.FC = () => {
  const { scene } = useCanvas(canvas);

  return (
    <main style={{ minHeight: "100vh" }}>
      <Head desc="A 2D physics playground built with Matter.js." ogImage="/img/og-matterjs.jpg" title="Matter.js" />
      <div
        ref={scene}
        style={{
          width: canvas.width * margin,
          height: canvas.height * margin,
          margin: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </main>
  );
};

export default MatterJs;
