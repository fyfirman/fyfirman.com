import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Blob, createGrainyGradient } from "~/lib/grainy-gradient";

// Colour field: weighted blend of soft colour blobs, fitted to the reference artwork.
const BLOBS: Blob[] = [
  [0.6449, 0.7016, 0.1266, "#7a879b"],
  [0.1987, 0.0673, 0.0991, "#001102"],
  [0.4102, 0.2477, 0.079, "#c49149"],
  [0.5488, 0.5246, 0.0687, "#8c4424"],
  [0.5951, 0.0231, 0.0651, "#bc5521"],
  [0.0925, -0.3, 0.2924, "#885d52"],
  [0.6903, 0.3544, 0.0833, "#002c1d"],
  [0.2821, 0.3312, 0.0795, "#a9e7ff"],
  [0.6823, 0.2871, 0.0952, "#ac3200"],
  [0.8044, 0.5371, 0.0718, "#a7b0c2"],
  [0.2488, 0.6022, 0.0891, "#4f483c"],
  [0.326, 0.1818, 0.139, "#ce4914"],
  [0.1199, 0.4334, 0.0842, "#a2bcd5"],
  [0.8039, 0.3859, 0.0802, "#2b5599"],
  [0.7446, 0.0768, 0.0965, "#115390"],
  [0.1125, 0.5733, 0.0815, "#1b4398"],
  [0.6462, 0.2136, 0.0782, "#ffa261"],
  [0.7578, 0.0028, 0.0935, "#ffeaee"],
];
const GRAIN = 0.072;
const DRIFT = 0.035; // how far blobs wander, in canvas widths

// Dotted sphere: Fibonacci sphere seen down its axis.
const SPHERE = { cx: 0.4979, cy: 0.6242, r: 0.5563, count: 5000, dot: 0.00262 };
const SPIN_SPEED = 0.035; // radians per second
const MAX_TILT = 0.14; // radians the sphere leans toward the cursor

const ASPECT = 974 / 613;

const Frame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${ASPECT};
  overflow: hidden;
  touch-action: pan-y;

  & canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

function createBackground(canvas: HTMLCanvasElement) {
  const gradient = createGrainyGradient(canvas, BLOBS.length);
  if (!gradient) return null;
  gradient.setBlobs(BLOBS);
  return (t: number, animate: boolean) => gradient.draw(t, animate ? DRIFT : 0, GRAIN);
}

// Unit-sphere points plus a fixed random size per dot.
function createPoints() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const { count } = SPHERE;
  const pts = new Float32Array(count * 4);
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < count; i++) {
    const z = 1 - ((i + 0.5) / count) * 2;
    const rho = Math.sqrt(1 - z * z);
    const a = i * golden;
    pts.set([rho * Math.cos(a), rho * Math.sin(a), z, 0.7 + rand() * 0.6], i * 4);
  }
  return pts;
}

function drawDots(ctx: CanvasRenderingContext2D, pts: Float32Array, spin: number, tiltX: number, tiltY: number) {
  const { width: W, height: H } = ctx.canvas;
  const { cx, cy, r, dot } = SPHERE;
  const cs = Math.cos(spin);
  const ss = Math.sin(spin);
  const cx1 = Math.cos(tiltX);
  const sx1 = Math.sin(tiltX);
  const cy1 = Math.cos(tiltY);
  const sy1 = Math.sin(tiltY);
  // Bucket dots by opacity so each bucket is filled as one path.
  const buckets = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];

  for (let i = 0; i < pts.length; i += 4) {
    // spin around the viewing axis
    const x0 = pts[i] * cs - pts[i + 1] * ss;
    const y0 = pts[i] * ss + pts[i + 1] * cs;
    // lean left/right (around y), then up/down (around x)
    const x1 = x0 * cx1 + pts[i + 2] * sx1;
    const z1 = -x0 * sx1 + pts[i + 2] * cx1;
    const y2 = y0 * cy1 + z1 * sy1;
    const z = -y0 * sy1 + z1 * cy1;
    if (z <= 0) continue;

    const x = (cx + x1 * r) * W;
    const y = (cy - y2 * r) * W;
    if (x < -5 || y < -5 || x > W + 5 || y > H + 5) continue;

    const s = dot * W * (0.45 + 0.55 * z) * pts[i + 3];
    const b = buckets[Math.min(3, Math.floor(z * 4))];
    b.moveTo(x + s, y);
    b.arc(x, y, s, 0, Math.PI * 2);
  }

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  buckets.forEach((b, k) => {
    ctx.globalAlpha = 0.75 + 0.25 * ((k + 0.5) / 4);
    ctx.fill(b);
  });
  ctx.globalAlpha = 1;
}

const DottedSphere: React.FC<{ className?: string }> = ({ className }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const bg = bgRef.current;
    const dotsCanvas = dotsRef.current;
    const ctx = dotsCanvas?.getContext("2d");
    if (!frame || !bg || !dotsCanvas || !ctx) return undefined;
    const drawBackground = createBackground(bg);
    const pts = createPoints();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let t = 0;

    const draw = () => {
      drawBackground?.(t, !reduceMotion);
      drawDots(ctx, pts, 5.4438 + t * SPIN_SPEED, tilt.x, tilt.y);
    };

    const tick = (now: number) => {
      t += Math.min(0.1, (now - last) / 1000);
      last = now;
      // ease toward the pointer so the lean feels weighty
      tilt.x += (pointer.x * MAX_TILT - tilt.x) * 0.05;
      tilt.y += (pointer.y * MAX_TILT - tilt.y) * 0.05;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(frame.clientWidth * dpr);
      const h = Math.round(frame.clientHeight * dpr);
      [bg, dotsCanvas].forEach((c) => {
        c.width = w;
        c.height = h;
      });
      draw();
    };

    const onPointer = (e: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pointer.y = Math.max(-1, Math.min(1, -(((e.clientY - rect.top) / rect.height) * 2 - 1)));
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(frame);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(frame);
    window.addEventListener("pointermove", onPointer);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <Frame ref={frameRef} className={className}>
      <canvas ref={bgRef} />
      <canvas ref={dotsRef} />
    </Frame>
  );
};

export default DottedSphere;
