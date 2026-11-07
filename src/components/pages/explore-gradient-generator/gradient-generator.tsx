import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Blob, createGrainyGradient } from "~/lib/grainy-gradient";
import { HARMONIES, harmonyPalette, randomBaseColor } from "~/lib/color-harmony";
import { CURATED_SOURCES } from "~/lib/curated-palettes";

const BLOB_COUNT = 18;
const MAX_BLOBS = 32;
const EXPORT_WIDTH = 2560;

const GALLERY_BATCH = 6;
const THUMB_WIDTH = 360;

const SOURCES = [
  { key: "all", name: "All" },
  ...CURATED_SOURCES.map(({ key, name }) => ({ key, name })),
  { key: "theory", name: "Colour theory" },
];

type Variant = { name: string; colors: string[]; seed: number; softness: number };

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
const randomSeed = () => Math.floor(Math.random() * 2147483646) + 1;

// A full cover: palette from a curated set (or a colour-theory harmony), a fresh layout and softness.
function randomVariant(source: string): Variant {
  const key = source === "all" ? pick([...CURATED_SOURCES.map((c) => c.key), "theory"]) : source;
  const curated = CURATED_SOURCES.find((c) => c.key === key);
  let name: string, colors: string[];
  if (curated) {
    ({ name, colors } = pick(curated.palettes));
  } else {
    const harmony = pick(HARMONIES);
    const base = randomBaseColor();
    name = `${harmony.name} from ${base}`;
    colors = harmonyPalette(base, harmony.recipe);
  }
  return { name, colors, seed: randomSeed(), softness: 0.8 + Math.random() * 0.6 };
}

const ASPECTS = [
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "9:16", value: 9 / 16 },
];

// Scatter blobs over the frame; every colour gets the same share so none disappears.
function layoutBlobs(palette: string[], seed: number, aspect: number, softness: number): Blob[] {
  let s = seed;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const height = 1 / aspect;
  // taller frames have more area to fill: add blobs and grow them a little, relative to 16:9
  const area = Math.max(1, height * (16 / 9));
  const count = Math.min(MAX_BLOBS, Math.round(BLOB_COUNT * Math.sqrt(area)));
  return Array.from({ length: count }, (_, i) => [
    -0.1 + rand() * 1.2,
    -0.1 * height + rand() * 1.2 * height,
    (0.06 + rand() * 0.07) * softness * area ** 0.25,
    palette[(i + Math.floor(seed / 7)) % palette.length],
  ]);
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
`;

const Preview = styled.div<{ $aspect: number }>`
  position: relative;
  width: min(100%, calc(70vh * ${({ $aspect }) => $aspect}));
  aspect-ratio: ${({ $aspect }) => $aspect};
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;

  & canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const Chip = styled.button<{ $active?: boolean }>`
  font: inherit;
  font-size: 0.85rem;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "var(--text-button)" : "var(--text-body)")};
  background: ${({ $active }) => ($active ? "var(--bg-button)" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "var(--bg-button)" : "var(--border-input)")};
`;

const ColorInput = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
  color: var(--text-body);

  & input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const Swatch = styled.span<{ color: string; size?: number }>`
  display: inline-block;
  width: ${({ size = 40 }) => size}px;
  height: ${({ size = 40 }) => size}px;
  border-radius: 8px;
  background: ${({ color }) => color};
  box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.35);
`;

const Harmonies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
`;

const HarmonyCard = styled.button<{ $active: boolean }>`
  font: inherit;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  color: var(--text-body);
  border: ${({ $active }) => ($active ? "2px solid var(--text-headings)" : "1px solid var(--border-input)")};
  margin: ${({ $active }) => ($active ? "0" : "1px")};

  & strong {
    font-size: 0.9rem;
    color: var(--text-headings);
  }

  & small {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const Strip = styled.span`
  display: flex;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;

  & span {
    flex: 1;
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const Thumb = styled.button<{ $aspect: number; $active: boolean }>`
  padding: 0;
  border: none;
  cursor: pointer;
  aspect-ratio: ${({ $aspect }) => $aspect};
  max-height: 260px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--border-input);
  outline: ${({ $active }) => ($active ? "2px solid var(--text-headings)" : "none")};
  outline-offset: 2px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Source = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const Credit = styled.small`
  font-size: 0.75rem;
  color: var(--text-secondary);

  & a {
    color: inherit;
  }
`;

const Slider = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-body);

  & span {
    width: 70px;
  }

  & input {
    flex: 1;
    max-width: 260px;
    accent-color: var(--text-headings);
  }
`;

const GradientGenerator: React.FC = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createGrainyGradient>>(null);
  const settingsRef = useRef({ drift: 0.035, grain: 0.072 });
  const timeRef = useRef(0);

  const [base, setBase] = useState("#ce4914");
  const [harmony, setHarmony] = useState("split");
  const [palette, setPalette] = useState(() => harmonyPalette("#ce4914", HARMONIES[2].recipe));
  const [seed, setSeed] = useState(4127);
  const [aspect, setAspect] = useState(ASPECTS[0].value);
  const [grain, setGrain] = useState(0.072);
  const [motion, setMotion] = useState(0.035);
  const [softness, setSoftness] = useState(1);
  const [copied, setCopied] = useState(false);
  const [paletteName, setPaletteName] = useState("Split complementary from #ce4914");
  const [source, setSource] = useState("all");
  const [variants, setVariants] = useState<Variant[]>([]);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const thumbRef = useRef<{ canvas: HTMLCanvasElement; renderer: ReturnType<typeof createGrainyGradient> }>();

  const suggestions = useMemo(() => HARMONIES.map((h) => ({ ...h, colors: harmonyPalette(base, h.recipe) })), [base]);
  const blobs = useMemo(() => layoutBlobs(palette, seed, aspect, softness), [palette, seed, aspect, softness]);

  settingsRef.current = { drift: motion, grain };

  const draw = () => rendererRef.current?.draw(timeRef.current, settingsRef.current.drift, settingsRef.current.grain);

  useEffect(() => {
    rendererRef.current?.setBlobs(blobs);
    draw();
  }, [blobs, grain, motion]);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return undefined;
    // keep the buffer so Download can read the last frame
    rendererRef.current = createGrainyGradient(canvas, MAX_BLOBS, { preserveDrawingBuffer: true });
    rendererRef.current?.setBlobs(blobs);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = true;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      timeRef.current += Math.min(0.1, (now - last) / 1000);
      last = now;
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
      canvas.width = Math.round(frame.clientWidth * dpr);
      canvas.height = Math.round(frame.clientHeight * dpr);
      draw();
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
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // set up once; blob changes are pushed by the effect above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gallery thumbnails are drawn once by a small offscreen renderer and kept as images.
  useEffect(() => {
    if (!thumbRef.current) {
      const canvas = document.createElement("canvas");
      thumbRef.current = { canvas, renderer: createGrainyGradient(canvas, MAX_BLOBS, { preserveDrawingBuffer: true }) };
    }
    const { canvas, renderer } = thumbRef.current;
    if (!renderer) return;
    canvas.width = THUMB_WIDTH;
    canvas.height = Math.round(THUMB_WIDTH / aspect);
    setThumbs(
      variants.map((v) => {
        renderer.setBlobs(layoutBlobs(v.colors, v.seed, aspect, v.softness));
        renderer.draw(0, 0, settingsRef.current.grain * 0.6);
        return canvas.toDataURL("image/jpeg", 0.85);
      }),
    );
  }, [variants, aspect]);

  const batch = (from: string) => Array.from({ length: GALLERY_BATCH }, () => randomVariant(from));
  const addVariants = () => setVariants((v) => [...v, ...batch(source)]);

  // random on the client only, so server and client markup match
  useEffect(() => setVariants(batch("all")), []);

  const isCurrent = (v: Variant) => palette === v.colors && seed === v.seed;

  const applyVariant = (v: Variant) => {
    setHarmony("");
    setPaletteName(v.name);
    setPalette(v.colors);
    setSeed(v.seed);
    setSoftness(v.softness);
  };

  const changeSource = (key: string) => {
    setSource(key);
    setVariants(batch(key));
  };

  const applyHarmony = (key: string, from = base) => {
    const h = HARMONIES.find((x) => x.key === key) ?? HARMONIES[0];
    setHarmony(h.key);
    setPaletteName(`${h.name} from ${from}`);
    setPalette(harmonyPalette(from, h.recipe));
  };

  const changeBase = (hex: string) => {
    setBase(hex);
    applyHarmony(harmony, hex);
  };

  const editSwatch = (index: number, hex: string) => {
    setHarmony("");
    setPaletteName("Custom");
    setPalette((p) => p.map((c, i) => (i === index ? hex : c)));
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas;
    // render once at export size; grain is per pixel so it stays fine-grained
    const exportWidth = aspect < 1 ? Math.round(EXPORT_WIDTH * aspect) : EXPORT_WIDTH;
    canvas.width = exportWidth;
    canvas.height = Math.round(exportWidth / aspect);
    draw();
    const url = canvas.toDataURL("image/png");
    canvas.width = width;
    canvas.height = height;
    draw();
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradient-${palette.map((c) => c.slice(1)).join("-")}.png`;
    a.click();
  };

  const copyPalette = async () => {
    await navigator.clipboard.writeText(palette.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Root>
      <Preview ref={frameRef} $aspect={aspect}>
        <canvas ref={canvasRef} />
      </Preview>

      <Row>
        <Chip $active onClick={() => applyVariant(randomVariant(source))}>
          Surprise me
        </Chip>
        <Chip onClick={() => setSeed(randomSeed())}>Shuffle layout</Chip>
        <Chip onClick={copyPalette}>{copied ? "Copied!" : "Copy hex"}</Chip>
        <Chip onClick={download}>Download PNG</Chip>
      </Row>

      <Section>
        <Label>More covers</Label>
        <Row>
          {SOURCES.map((src) => (
            <Chip key={src.key} $active={source === src.key} onClick={() => changeSource(src.key)}>
              {src.name}
            </Chip>
          ))}
        </Row>
        <Gallery>
          {variants.map((v, i) => (
            <Thumb key={i} $aspect={aspect} $active={isCurrent(v)} title={v.name} onClick={() => applyVariant(v)}>
              {thumbs[i] ? <img src={thumbs[i]} alt={v.name} /> : null}
            </Thumb>
          ))}
        </Gallery>
        <Row>
          <Chip onClick={addVariants}>More covers</Chip>
        </Row>
        <Credit>
          Palettes from Sanzo Wada&apos;s <em>A Dictionary of Color Combinations</em> (1933, via{" "}
          <a href="https://github.com/mattdesl/dictionary-of-colour-combinations">mattdesl</a>) and the top-rated{" "}
          <a href="https://github.com/Experience-Monks/nice-color-palettes">COLOURlovers palettes</a>, plus
          colour-theory harmonies.
        </Credit>
      </Section>

      <Section>
        <Label>Base colour</Label>
        <Row>
          <ColorInput>
            <Swatch color={base} size={44} />
            {base}
            <input type="color" value={base} onChange={(e) => changeBase(e.target.value)} />
          </ColorInput>
          <Chip onClick={() => changeBase(randomBaseColor())}>Random colour</Chip>
        </Row>
      </Section>

      <Section>
        <Label>Recommended palettes</Label>
        <Harmonies>
          {suggestions.map((h) => (
            <HarmonyCard key={h.key} $active={harmony === h.key} onClick={() => applyHarmony(h.key)}>
              <Strip>
                {h.colors.map((c, i) => (
                  <span key={i} style={{ background: c }} />
                ))}
              </Strip>
              <strong>{h.name}</strong>
              <small>{h.hint}</small>
            </HarmonyCard>
          ))}
        </Harmonies>
      </Section>

      <Section>
        <Label>Palette (tap to edit)</Label>
        <Source>{paletteName}</Source>
        <Row>
          {palette.map((c, i) => (
            <ColorInput key={i} title={c}>
              <Swatch color={c} />
              <input type="color" value={c} onChange={(e) => editSwatch(i, e.target.value)} />
            </ColorInput>
          ))}
        </Row>
      </Section>

      <Section>
        <Label>Frame</Label>
        <Row>
          {ASPECTS.map((a) => (
            <Chip key={a.label} $active={aspect === a.value} onClick={() => setAspect(a.value)}>
              {a.label}
            </Chip>
          ))}
        </Row>
        <Slider>
          <span>Grain</span>
          <input
            type="range"
            min={0}
            max={0.2}
            step={0.004}
            value={grain}
            onChange={(e) => setGrain(+e.target.value)}
          />
        </Slider>
        <Slider>
          <span>Motion</span>
          <input
            type="range"
            min={0}
            max={0.1}
            step={0.005}
            value={motion}
            onChange={(e) => setMotion(+e.target.value)}
          />
        </Slider>
        <Slider>
          <span>Softness</span>
          <input
            type="range"
            min={0.6}
            max={2}
            step={0.05}
            value={softness}
            onChange={(e) => setSoftness(+e.target.value)}
          />
        </Slider>
      </Section>
    </Root>
  );
};

export default GradientGenerator;
