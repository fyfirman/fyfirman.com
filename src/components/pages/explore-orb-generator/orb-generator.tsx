import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Dices, Download, Pause, Phone, Play } from "lucide-react";

const SANS = `Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif`;
const EXPORT_SIZE = 2048;

interface Palette {
  name: string;
  deep: string;
  mid: string;
  soft: string;
  light: string;
  bg: string;
}

// deep → mid → soft → light, from the darkest veins to the pale highlights.
const PRESETS: Palette[] = [
  { name: "Rose", deep: "#6e0d43", mid: "#c9387f", soft: "#e8a2c3", light: "#f4dfe5", bg: "#f2f0ef" },
  { name: "Ocean", deep: "#0b2a6b", mid: "#2f6fd6", soft: "#9fc3f2", light: "#eef3f8", bg: "#eff1f3" },
  { name: "Ember", deep: "#6b1a05", mid: "#e2551c", soft: "#f6ad7c", light: "#fbefe6", bg: "#f3f0ed" },
  { name: "Lilac", deep: "#36186f", mid: "#7c4ed8", soft: "#c3abf0", light: "#f1edf8", bg: "#f1f0f3" },
  { name: "Mint", deep: "#064a3a", mid: "#1ea37c", soft: "#93dcc0", light: "#eef7f2", bg: "#eff2f0" },
  { name: "Mono", deep: "#141414", mid: "#5a5a5a", soft: "#b4b4b4", light: "#f2f2f2", bg: "#f2f1f0" },
];

interface Settings extends Palette {
  seed: number;
  scale: number;
  warp: number;
  balance: number;
  grain: number;
  speed: number;
}

const DEFAULTS: Settings = {
  ...PRESETS[0],
  seed: 150,
  scale: 0.42,
  warp: 0.9,
  balance: 0.05,
  grain: 0.15,
  speed: 0.5,
};

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const vertexShader = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// 3D simplex noise by Ian McEwan / Ashima Arts (MIT).
const fragmentShader = `
  precision highp float;
  uniform vec2 res;
  uniform float time;
  uniform float frame;
  uniform vec3 seed;
  uniform float scale;
  uniform float warp;
  uniform float balance;
  uniform float grain;
  uniform float transparent;
  uniform vec3 cDeep, cMid, cSoft, cLight, cBg;

  vec4 permute(vec4 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float fbm(vec3 p){
    float s = 0.0, a = 0.6;
    for (int i = 0; i < 3; i++) { s += a * snoise(p); p = p * 1.9 + vec3(1.7, 9.2, 3.1); a *= 0.35; }
    return s;
  }

  float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }

  mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
  mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }

  void main(){
    float radius = 0.5 * min(res.x, res.y) - 1.0;
    vec2 uv = (gl_FragCoord.xy - 0.5 * res) / radius;
    float d = length(uv);
    float aa = 1.2 / radius;
    float inside = 1.0 - smoothstep(1.0 - aa, 1.0 + aa, d);

    // Read the noise off the surface of a turning sphere, so features squeeze toward the rim.
    vec3 n0 = vec3(uv, sqrt(max(0.0, 1.0 - min(d, 1.0) * min(d, 1.0))));
    vec3 n = rotY(time * 0.11) * rotX(0.35 + time * 0.03) * n0;
    vec3 p = n * scale + seed;

    // Domain warp: noise bent by more noise gives the marbled, folded look.
    vec3 q = vec3(fbm(p), fbm(p + vec3(5.2, 1.3, 2.8)), fbm(p + vec3(1.7, 9.2, 4.1)));
    float f = fbm(p + warp * q + vec3(0.0, 0.0, time * 0.05));
    // Finer folds that only show near the rim, where the surface turns away.
    float rim = pow(1.0 - n0.z, 2.2);
    f += rim * 0.3 * fbm(p * 3.5 + warp * 2.5 * q);
    f = clamp(0.5 + f * 1.1 + balance, 0.0, 1.0);

    vec3 c = mix(cLight, cSoft, smoothstep(0.18, 0.48, f));
    c = mix(c, cMid, smoothstep(0.42, 0.72, f));
    c = mix(c, cDeep, smoothstep(0.68, 1.0, f));

    // A soft milky haze across the face, thinning toward the rim.
    float haze = 0.12 * pow(max(0.0, 1.0 - d), 0.6);
    c = mix(c, cLight, haze);

    vec2 jitter = mod(vec2(17.31, 41.77) * frame, 997.0);
    c += (hash(gl_FragCoord.xy + jitter) - 0.5) * grain;

    if (transparent > 0.5) gl_FragColor = vec4(c * inside, inside);
    else gl_FragColor = vec4(mix(cBg, c, inside), 1.0);
  }`;

interface Renderer {
  draw: (s: Settings, t: number, frame: number, transparent: boolean) => void;
}

function createRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, premultipliedAlpha: true });
  if (!gl) return null;

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();
  if (!vs || !fs || !prog) return null;
  gl.shaderSource(vs, vertexShader);
  gl.compileShader(vs);
  gl.shaderSource(fs, fragmentShader);
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

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const U = {
    res: u("res"),
    time: u("time"),
    frame: u("frame"),
    seed: u("seed"),
    scale: u("scale"),
    warp: u("warp"),
    balance: u("balance"),
    grain: u("grain"),
    transparent: u("transparent"),
    cDeep: u("cDeep"),
    cMid: u("cMid"),
    cSoft: u("cSoft"),
    cLight: u("cLight"),
    cBg: u("cBg"),
  };

  return {
    draw: (s, t, frame, transparent) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, t);
      gl.uniform1f(U.frame, frame);
      // Spread seeds far apart in noise space so each one is a new pattern.
      gl.uniform3f(U.seed, s.seed * 13.37, s.seed * 7.91, s.seed * 3.17);
      gl.uniform1f(U.scale, s.scale);
      gl.uniform1f(U.warp, s.warp);
      gl.uniform1f(U.balance, s.balance);
      gl.uniform1f(U.grain, s.grain);
      gl.uniform1f(U.transparent, transparent ? 1 : 0);
      gl.uniform3fv(U.cDeep, hex(s.deep));
      gl.uniform3fv(U.cMid, hex(s.mid));
      gl.uniform3fv(U.cSoft, hex(s.soft));
      gl.uniform3fv(U.cLight, hex(s.light));
      gl.uniform3fv(U.cBg, hex(s.bg));
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

// ── Layout ───────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 24px;
  font-family: ${SANS};
  color: #18181b;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Stage = styled.div`
  position: relative;
  aspect-ratio: 1;
  padding: 8%;
  border-radius: 20px;
  overflow: hidden;
  transition: background-color 0.2s ease;
`;

const OrbBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const CallButton = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 27%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);

  & svg {
    width: 30%;
    height: 30%;
    transform: scaleX(-1);
  }
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #ececef;
  font-size: 13px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8b8b94;
`;

const Presets = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const PresetButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid ${({ active }) => (active ? "#18181b" : "#ececef")};
  background: #fff;
  font: inherit;
  font-size: 12px;
  color: inherit;
  cursor: pointer;

  & span {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex: none;
  }
`;

const Swatches = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`;

const Swatch = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #6b6b74;
  cursor: pointer;

  & input {
    width: 100%;
    height: 32px;
    padding: 0;
    border: 1px solid #ececef;
    border-radius: 8px;
    background: none;
    cursor: pointer;
  }

  & input::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  & input::-webkit-color-swatch {
    border: 0;
    border-radius: 7px;
  }

  & input::-moz-color-swatch {
    border: 0;
    border-radius: 7px;
  }
`;

const Slider = styled.label`
  display: grid;
  grid-template-columns: 64px 1fr 36px;
  align-items: center;
  gap: 10px;

  & input {
    width: 100%;
    accent-color: #18181b;
  }

  & output {
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: #6b6b74;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  & svg {
    width: 15px;
    height: 15px;
  }
`;

const Button = styled.button`
  ${buttonBase}
  flex: 1;
  border: 1px solid #ececef;
  background: #fff;
  color: inherit;
`;

const PrimaryButton = styled.button`
  ${buttonBase}
  width: 100%;
  border: 0;
  background: #18181b;
  color: #fff;
`;

const Check = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  & input {
    accent-color: #18181b;
  }
`;

// ── Component ────────────────────────────────────────────────────────────

const SLIDERS: { key: keyof Settings; label: string; min: number; max: number; step: number }[] = [
  { key: "seed", label: "Seed", min: 0, max: 999, step: 1 },
  { key: "scale", label: "Scale", min: 0.2, max: 2.5, step: 0.05 },
  { key: "warp", label: "Warp", min: 0, max: 3, step: 0.05 },
  { key: "balance", label: "Depth", min: -0.4, max: 0.4, step: 0.01 },
  { key: "grain", label: "Grain", min: 0, max: 0.3, step: 0.005 },
  { key: "speed", label: "Speed", min: 0, max: 2, step: 0.05 },
];

const COLORS: { key: "deep" | "mid" | "soft" | "light" | "bg"; label: string }[] = [
  { key: "deep", label: "Deep" },
  { key: "mid", label: "Mid" },
  { key: "soft", label: "Soft" },
  { key: "light", label: "Light" },
  { key: "bg", label: "Bg" },
];

const OrbGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const settingsRef = useRef<Settings>(DEFAULTS);
  const timeRef = useRef(0);
  const frameRef = useRef(0);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [playing, setPlaying] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [transparent, setTransparent] = useState(false);

  settingsRef.current = settings;

  const redraw = useCallback(() => {
    rendererRef.current?.draw(settingsRef.current, timeRef.current, frameRef.current, false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    rendererRef.current = createRenderer(canvas);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      redraw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, [redraw]);

  // Redraw on any change while paused.
  useEffect(redraw, [settings, redraw]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!playing || reduceMotion) return undefined;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      timeRef.current += Math.min(0.1, (now - last) / 1000) * settingsRef.current.speed;
      last = now;
      frameRef.current = Math.floor(now / (1000 / 24));
      redraw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, redraw]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => setSettings((s) => ({ ...s, [key]: value }));

  const download = () => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;
    const { width, height } = canvas;
    canvas.width = EXPORT_SIZE;
    canvas.height = EXPORT_SIZE;
    renderer.draw(settings, timeRef.current, frameRef.current, transparent);
    const url = canvas.toDataURL("image/png");
    canvas.width = width;
    canvas.height = height;
    redraw();
    const a = document.createElement("a");
    a.href = url;
    a.download = `orb-${settings.name.toLowerCase()}-${settings.seed}.png`;
    a.click();
  };

  return (
    <Wrapper>
      <Stage style={{ backgroundColor: settings.bg }}>
        <OrbBox>
          <canvas ref={canvasRef} />
          {showButton ? (
            <CallButton aria-hidden>
              <Phone fill="currentColor" strokeWidth={0} />
            </CallButton>
          ) : null}
        </OrbBox>
      </Stage>

      <Panel>
        <Group>
          <Label>Presets</Label>
          <Presets>
            {PRESETS.map((p) => (
              <PresetButton
                key={p.name}
                type="button"
                active={settings.name === p.name}
                onClick={() => setSettings((s) => ({ ...s, ...p }))}
              >
                <span
                  style={{ background: `radial-gradient(circle at 35% 35%, ${p.soft}, ${p.mid} 55%, ${p.deep})` }}
                />
                {p.name}
              </PresetButton>
            ))}
          </Presets>
        </Group>

        <Group>
          <Label>Colours</Label>
          <Swatches>
            {COLORS.map(({ key, label }) => (
              <Swatch key={key}>
                <input
                  type="color"
                  value={settings[key]}
                  onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value, name: "Custom" }))}
                />
                {label}
              </Swatch>
            ))}
          </Swatches>
        </Group>

        <Group>
          <Label>Shape</Label>
          {SLIDERS.map(({ key, label, min, max, step }) => (
            <Slider key={key}>
              {label}
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={settings[key] as number}
                onChange={(e) => update(key, Number(e.target.value))}
              />
              <output>{(settings[key] as number).toFixed(key === "seed" ? 0 : 2)}</output>
            </Slider>
          ))}
        </Group>

        <Group>
          <Row>
            <Button type="button" onClick={() => update("seed", Math.floor(Math.random() * 1000))}>
              <Dices /> Shuffle
            </Button>
            <Button type="button" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause /> : <Play />} {playing ? "Pause" : "Play"}
            </Button>
          </Row>
          <Check>
            <input type="checkbox" checked={showButton} onChange={(e) => setShowButton(e.target.checked)} />
            Show call button
          </Check>
          <Check>
            <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} />
            Transparent PNG
          </Check>
          <PrimaryButton type="button" onClick={download}>
            <Download /> Download PNG
          </PrimaryButton>
        </Group>
      </Panel>
    </Wrapper>
  );
};

export default OrbGenerator;
