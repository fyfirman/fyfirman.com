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
