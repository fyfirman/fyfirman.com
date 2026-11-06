import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Colour field: weighted blend of soft colour blobs, fitted to the reference artwork.
// [x, y, radius, colour], x/y/radius in units of the canvas width (y from the top).
const BLOBS: [number, number, number, string][] = [
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

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const vertexShader = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const fragmentShader = (n: number) => `
  precision highp float;
  uniform vec2 res;
  uniform float time;
  uniform float drift;
  uniform float grain;
  uniform vec4 blob[${n}];
  uniform vec3 col[${n}];
  float hash(vec2 p){ p = fract(p * vec2(443.897, 441.423)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
  void main(){
    vec2 uv = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y) / res.x;
    float lw[${n}]; float m = -1e9;
    for (int i = 0; i < ${n}; i++) {
      float k = float(i);
      vec2 wander = vec2(sin(time * (0.11 + 0.017 * k) + k * 1.7), cos(time * (0.09 + 0.013 * k) + k * 2.3)) * drift;
      vec2 d = uv - blob[i].xy - wander;
      lw[i] = -dot(d, d) / (2.0 * blob[i].z * blob[i].z);
      m = max(m, lw[i]);
    }
    vec3 c = vec3(0.0); float ws = 0.0;
    for (int i = 0; i < ${n}; i++) { float w = exp(lw[i] - m); c += w * col[i]; ws += w; }
    c /= ws;
    vec2 frame = vec2(17.31, 41.77) * floor(time * 24.0);
    c += (hash(gl_FragCoord.xy + mod(frame, 997.0)) - 0.5) * grain;
    gl_FragColor = vec4(c, 1.0);
  }`;

function createBackground(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl");
  if (!gl) return null;

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.shaderSource(vs, vertexShader);
  gl.compileShader(vs);
  gl.shaderSource(fs, fragmentShader(BLOBS.length));
  gl.compileShader(fs);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  gl.uniform1f(gl.getUniformLocation(prog, "grain"), GRAIN);
  gl.uniform4fv(
    gl.getUniformLocation(prog, "blob"),
    BLOBS.flatMap(([x, y, r]) => [x, y, r, 0]),
  );
  gl.uniform3fv(
    gl.getUniformLocation(prog, "col"),
    BLOBS.flatMap((b) => hex(b[3])),
  );
  const res = gl.getUniformLocation(prog, "res");
  const time = gl.getUniformLocation(prog, "time");
  const drift = gl.getUniformLocation(prog, "drift");

  return (t: number, animate: boolean) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(res, canvas.width, canvas.height);
    gl.uniform1f(time, t);
    gl.uniform1f(drift, animate ? DRIFT : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
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
