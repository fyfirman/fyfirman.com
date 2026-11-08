import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, EllipsisVertical, Trash2, Upload, X } from "lucide-react";

const MB = 1024 * 1024;
const MAX_SIZE = 20 * MB;
const TICK_PITCH = 4; // px per progress tick (2px tick + 2px gap)

const SANS = `Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif`;
const MONO = `"Geist Mono", "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace`;
const ORANGE = "#f0692b";

type Status = "uploading" | "complete" | "error";

interface UploadItem {
  id: number;
  name: string;
  size: number;
  loaded: number;
  status: Status;
}

let nextId = 0;
const item = (name: string, size: number, loaded: number): UploadItem => ({
  id: nextId++,
  name,
  size,
  loaded,
  status: size > MAX_SIZE ? "error" : loaded >= size ? "complete" : "uploading",
});

const seed = () => [
  item("investor-pitch-deck.pdf", 14 * MB, 14 * MB),
  item("landing-copy-update.docx", 4 * MB, 2.72 * MB),
  item("product-ui-concepts.fig", 14 * MB, 4.5 * MB),
];

// Extension → icon colour [top, bottom].
const FILE_COLORS: Partial<Record<string, [string, string]>> = {
  pdf: ["#ff7a80", "#f2454f"],
  doc: ["#5fb0ff", "#2d84ee"],
  docx: ["#5fb0ff", "#2d84ee"],
  txt: ["#5fb0ff", "#2d84ee"],
  fig: ["#9a86ff", "#6c4cf1"],
  sketch: ["#ffc35a", "#f59e0b"],
  png: ["#4fd69c", "#16a46c"],
  jpg: ["#4fd69c", "#16a46c"],
  jpeg: ["#4fd69c", "#16a46c"],
  gif: ["#4fd69c", "#16a46c"],
  svg: ["#4fd69c", "#16a46c"],
  webp: ["#4fd69c", "#16a46c"],
  xls: ["#3fcf7f", "#14965a"],
  xlsx: ["#3fcf7f", "#14965a"],
  csv: ["#3fcf7f", "#14965a"],
  ppt: ["#ff9b5c", "#ef6a22"],
  pptx: ["#ff9b5c", "#ef6a22"],
  zip: ["#b6b6bf", "#82828c"],
  mp4: ["#ff7fbf", "#e8448f"],
  mov: ["#ff7fbf", "#e8448f"],
  mp3: ["#f989d8", "#d946b8"],
};

const extOf = (name: string) => {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
};

const fmt = (bytes: number, decimals = 1) => {
  if (bytes < MB) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  const mb = bytes / MB;
  return `${Number.isInteger(mb) ? mb : mb.toFixed(decimals)} MB`;
};

// ── Stage ────────────────────────────────────────────────────────────────

const hatch = (alpha: number) => css`
  background-image: repeating-linear-gradient(45deg, rgba(24, 24, 27, ${alpha}) 0 1px, transparent 1px 10px);
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  min-height: 720px;
  padding: 120px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f6f6f7;
  font-family: ${SANS};
  color: #18181b;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    padding: 72px 12px;
    min-height: 0;
  }
`;

const RailLines = styled.div`
  position: absolute;
  inset: 0 7.8%;
  border-left: 1px solid #e6e6e9;
  border-right: 1px solid #e6e6e9;
  background-color: #f9f9fa;
  ${hatch(0.03)}
  pointer-events: none;

  @media (max-width: 600px) {
    inset: 0;
    border: 0;
  }
`;

const dashedX = css`
  background-image: linear-gradient(to right, #dcdce1 50%, transparent 50%);
  background-size: 6px 1px;
`;
const dashedY = css`
  background-image: linear-gradient(to bottom, #dcdce1 50%, transparent 50%);
  background-size: 1px 6px;
`;

const Guides = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: -100vw;
    right: -100vw;
    height: 1px;
    ${dashedX}
  }
  &::before {
    top: -4px;
  }
  &::after {
    bottom: -4px;
  }

  & > i {
    position: absolute;
    top: -100vh;
    bottom: -100vh;
    width: 1px;
    ${dashedY}
  }
  & > i:first-child {
    left: -3px;
  }
  & > i:last-child {
    right: -3px;
  }
`;

const Credit = styled.div`
  position: absolute;
  bottom: 26px;
  min-height: 26px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #a1a1aa;

  & a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Avatar = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(160deg, #6b4e3d, #2b211b);
  color: #f4ece6;
  font-size: 11px;
  font-weight: 600;
`;

// ── Card ─────────────────────────────────────────────────────────────────

const CardWrap = styled.div`
  position: relative;
  width: 502px;
  max-width: 100%;
`;

const Card = styled(motion.div)`
  position: relative;
  padding: 0 3px 3px;
  border-radius: 14px;
  background: #f4f4f6;
  border: 1px solid #e4e4e8;
  box-shadow: 0 1px 2px rgba(24, 24, 27, 0.04), 0 12px 24px -8px rgba(24, 24, 27, 0.06),
    0 36px 64px -24px rgba(24, 24, 27, 0.14);
`;

const Header = styled.div`
  height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h2 {
    margin: 0;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: -0.005em;
    color: #18181b;
  }
`;

const IconButton = styled.button`
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #63636d;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, transform 150ms ease;

  @media (hover: hover) {
    &:hover {
      background: rgba(24, 24, 27, 0.06);
      color: #18181b;
    }
  }
  &:active {
    transform: scale(0.94);
  }
  &:focus-visible {
    outline: 2px solid ${ORANGE};
    outline-offset: 1px;
  }
`;

const Dropzone = styled.div<{ $active: boolean }>`
  position: relative;
  height: 162px;
  border-radius: 12px;
  border: 1px dashed #d6d6dc;
  ${hatch(0.022)}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: border-color 160ms ease, background-color 160ms ease;

  &:focus-visible {
    border-color: ${ORANGE};
  }

  ${({ $active }) =>
    $active &&
    css`
      border-color: ${ORANGE};
      background-color: rgba(240, 105, 43, 0.045);
    `}
`;

const UploadBadge = styled.span<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #fff;
  color: ${ORANGE};
  box-shadow: 0 0 0 1px rgba(24, 24, 27, 0.05), 0 1px 2px rgba(24, 24, 27, 0.08), 0 2px 6px rgba(24, 24, 27, 0.04);
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateY(${({ $active }) => ($active ? "-3px" : "0")});
`;

const DropText = styled.p`
  margin: 17px 0 0;
  font-size: 12px;
  line-height: 1;
  color: #27272a;

  & span {
    color: ${ORANGE};
    text-decoration: underline;
    text-decoration-color: rgba(240, 105, 43, 0.45);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
`;

const Caption = styled.p`
  margin: 10px 0 0;
  font-family: ${MONO};
  font-size: 9px;
  line-height: 1;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #9a9aa3;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled(motion.li)`
  overflow: hidden;
`;

const RowInner = styled.div`
  margin-top: 4px;
  padding: 14px 14px 13px 18px;
  display: flex;
  gap: 13px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ebebef;
  box-shadow: 0 1px 1.5px rgba(24, 24, 27, 0.025);
`;

const RowBody = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 1px;
`;

const RowTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Name = styled.p`
  margin: 0;
  font-size: 12.5px;
  line-height: 15px;
  color: #18181b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.p<{ $tone?: "green" | "red" }>`
  margin: 4px 0 0;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: ${MONO};
  font-size: 9px;
  line-height: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8e8e97;
  white-space: nowrap;

  & b {
    font-weight: 400;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ $tone }) => ($tone === "red" ? "#e5484d" : "#22a148")};
  }
`;

const RowAction = styled(IconButton)`
  flex: none;
  margin: -1px -4px 0 auto;
  color: #8a8a93;
`;

const blink = keyframes`
  0%, 20% { opacity: 0.25; }
  40%, 100% { opacity: 1; }
`;

const Dots = styled.span`
  letter-spacing: 0;

  & i {
    font-style: normal;
    animation: ${blink} 1.2s infinite alternate;
  }
  & i:nth-child(2) {
    animation-delay: 0.2s;
  }
  & i:nth-child(3) {
    animation-delay: 0.4s;
  }

  @media (prefers-reduced-motion: reduce) {
    & i {
      animation: none;
    }
  }
`;

const ProgressRow = styled.div`
  margin-top: 9px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Ticks = styled.div`
  flex: 1;
  min-width: 0;
  height: 10px;
  display: flex;
  gap: ${TICK_PITCH / 2}px;
  overflow: hidden;

  & span {
    flex: none;
    width: ${TICK_PITCH / 2}px;
    height: 100%;
    border-radius: 0.5px;
    background: #e2e2e7;
    transition: background-color 180ms ease;
  }
  & span[data-on] {
    background: ${ORANGE};
  }
`;

const Percent = styled.span`
  width: 28px;
  flex: none;
  text-align: right;
  font-family: ${MONO};
  font-size: 9px;
  letter-spacing: 0.04em;
  color: #8e8e97;
  font-variant-numeric: tabular-nums;
`;

const Footer = styled.div`
  height: 54px;
  padding: 0 12px 0 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Divider = styled.span`
  width: 1px;
  height: 14px;
  margin: 0 4px;
  background: #e0e0e5;
`;

const TextButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  margin: 0;
  padding: 0 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  font-family: ${MONO};
  font-size: 9px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #6b6b75;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;

  & svg {
    color: #75757f;
  }
  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: rgba(24, 24, 27, 0.06);
      color: #18181b;
    }
  }
  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
  &:focus-visible {
    outline: 2px solid ${ORANGE};
    outline-offset: 1px;
  }
`;

const PrimaryButton = styled.button<{ $busy: boolean }>`
  margin: 0 0 0 auto;
  height: 26px;
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  font-family: ${SANS};
  font-size: 11.5px;
  font-weight: 450;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease, transform 150ms ease, box-shadow 200ms ease;
  background: #18181b;
  color: #fff;
  box-shadow: 0 1px 2px rgba(24, 24, 27, 0.2);

  ${({ $busy }) =>
    $busy &&
    css`
      background: #e8e8ec;
      color: #55555e;
      box-shadow: inset 0 0 0 1px rgba(24, 24, 27, 0.03);
      cursor: default;
    `}

  &:active:not(:disabled) {
    transform: scale(0.97);
  }
  &:focus-visible {
    outline: 2px solid ${ORANGE};
    outline-offset: 2px;
  }
`;

const Menu = styled(motion.div)`
  position: absolute;
  left: 8px;
  bottom: 44px;
  z-index: 2;
  min-width: 156px;
  padding: 4px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e7e7eb;
  box-shadow: 0 10px 28px -6px rgba(24, 24, 27, 0.16), 0 2px 6px rgba(24, 24, 27, 0.05);
  transform-origin: bottom left;

  & button {
    display: block;
    width: 100%;
    margin: 0;
    padding: 7px 9px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    text-align: left;
    font-family: ${SANS};
    font-size: 12px;
    color: #27272a;
    cursor: pointer;
  }
  & button:hover,
  & button:focus-visible {
    outline: none;
    background: #f4f4f6;
  }
`;

const Reopen = styled(motion.button)`
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: 34px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #e4e4e8;
  background: #fff;
  font-family: ${SANS};
  font-size: 12.5px;
  color: #18181b;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(24, 24, 27, 0.05), 0 8px 20px -8px rgba(24, 24, 27, 0.12);

  & svg {
    color: ${ORANGE};
  }
`;

// ── Pieces ───────────────────────────────────────────────────────────────

const FileIcon = ({ name }: { name: string }) => {
  const ext = extOf(name);
  const [top, bottom] = FILE_COLORS[ext] ?? ["#b6b6bf", "#82828c"];
  const label = (ext || "file").slice(0, 4).toUpperCase();
  const gid = `fi-${ext || "file"}`;

  return (
    <svg aria-hidden height="31" style={{ flex: "none" }} viewBox="0 0 27 31" width="27">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <path
        d="M4.5 0H18l9 9v17.5a4.5 4.5 0 0 1-4.5 4.5h-18A4.5 4.5 0 0 1 0 26.5v-22A4.5 4.5 0 0 1 4.5 0Z"
        fill={`url(#${gid})`}
      />
      <path d="M18 0v5.5A3.5 3.5 0 0 0 21.5 9H27Z" fill="#fff" fillOpacity="0.38" />
      <text
        fill="#fff"
        fontFamily={SANS}
        fontSize={label.length > 3 ? 5.4 : 6}
        fontWeight="700"
        letterSpacing="0.02em"
        textAnchor="middle"
        x="13.5"
        y="23.5"
      >
        {label}
      </text>
    </svg>
  );
};

const TickBar = ({ value }: { value: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(96);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setCount(Math.max(1, Math.floor((el.clientWidth + TICK_PITCH / 2) / TICK_PITCH)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const on = Math.round(value * count);
  return (
    <Ticks ref={ref}>
      {Array.from({ length: count }, (_, i) => (
        <span data-on={i < on ? "" : undefined} key={i} />
      ))}
    </Ticks>
  );
};

const FileRow = ({ file, paused, onRemove }: { file: UploadItem; paused: boolean; onRemove: () => void }) => {
  const progress = Math.min(1, file.loaded / file.size);

  return (
    <RowInner>
      <FileIcon name={file.name} />
      <RowBody>
        <RowTop>
          <div style={{ minWidth: 0 }}>
            <Name title={file.name}>{file.name}</Name>
            {file.status === "complete" ? (
              <Meta $tone="green">
                {fmt(file.size)} /
                <b>
                  <Check size={9} strokeWidth={2.5} /> Complete
                </b>
              </Meta>
            ) : null}
            {file.status === "uploading" ? (
              <Meta>
                {fmt(file.loaded)} of {fmt(file.size)} /{" "}
                {paused ? (
                  "Paused"
                ) : (
                  <>
                    Uploading{" "}
                    <Dots>
                      <i>.</i>
                      <i>.</i>
                      <i>.</i>
                    </Dots>
                  </>
                )}
              </Meta>
            ) : null}
            {file.status === "error" ? (
              <Meta $tone="red">
                {fmt(file.size)} /<b>Exceeds 20 MB limit</b>
              </Meta>
            ) : null}
          </div>
          <RowAction
            aria-label={file.status === "uploading" ? `Cancel ${file.name}` : `Remove ${file.name}`}
            onClick={onRemove}
            type="button"
          >
            {file.status === "complete" ? <Trash2 size={15} strokeWidth={1.6} /> : <X size={15} strokeWidth={1.6} />}
          </RowAction>
        </RowTop>
        {file.status === "uploading" ? (
          <ProgressRow>
            <TickBar value={progress} />
            <Percent>{Math.floor(progress * 100)}%</Percent>
          </ProgressRow>
        ) : null}
      </RowBody>
    </RowInner>
  );
};

// ── Component ────────────────────────────────────────────────────────────

const UploadFiles = () => {
  const [files, setFiles] = useState<UploadItem[]>(seed);
  const [open, setOpen] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragDepth = useRef(0);
  const speeds = useRef(new Map<number, number>());
  const reduceMotion = useReducedMotion();

  const uploading = files.some((f) => f.status === "uploading");

  // Simulated network: each file gets a base speed, jittered every tick.
  useEffect(() => {
    if (!uploading || paused) return undefined;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.5, (now - last) / 1000);
      last = now;
      setFiles((prev) =>
        prev.map((f) => {
          if (f.status !== "uploading") return f;
          let base = speeds.current.get(f.id);
          if (base === undefined) {
            // Aim for ~25–40s per file so the demo has time to breathe.
            base = f.size / (25 + Math.random() * 15);
            speeds.current.set(f.id, base);
          }
          const stall = Math.random() < 0.06 ? 0 : 1;
          const loaded = Math.min(f.size, f.loaded + base * (0.35 + Math.random() * 1.3) * stall * dt);
          return { ...f, loaded, status: loaded >= f.size ? "complete" : "uploading" };
        }),
      );
    }, 120);
    return () => window.clearInterval(timer);
  }, [uploading, paused]);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list?.length) return;
    const added = Array.from(list).map((f) => item(f.name, f.size, 0));
    setFiles((prev) => [...prev, ...added]);
  }, []);

  const remove = (id: number) => {
    speeds.current.delete(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Stop the browser from opening files dropped outside the dropzone.
  useEffect(() => {
    const prevent = (e: DragEvent) => e.preventDefault();
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const browse = () => inputRef.current?.click();

  const rowMotion = reduceMotion
    ? {}
    : {
        layout: "position" as const,
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
      };

  return (
    <Stage>
      <RailLines />
      <CardWrap>
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <Card
              animate={{ opacity: 1, scale: 1, y: 0 }}
              aria-labelledby="upload-files-title"
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 6 }}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 6 }}
              key="card"
              role="dialog"
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              <Guides>
                <i />
                <i />
              </Guides>
              <Header>
                <h2 id="upload-files-title">Upload files</h2>
                <IconButton aria-label="Close" onClick={() => setOpen(false)} style={{ marginRight: -5 }} type="button">
                  <X size={15} strokeWidth={1.6} />
                </IconButton>
              </Header>

              <Dropzone
                $active={dragging}
                aria-label="Upload files: drag and drop or browse"
                onClick={browse}
                onDragEnter={(e) => {
                  e.preventDefault();
                  dragDepth.current += 1;
                  setDragging(true);
                }}
                onDragLeave={() => {
                  dragDepth.current -= 1;
                  if (dragDepth.current <= 0) setDragging(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "copy";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  dragDepth.current = 0;
                  setDragging(false);
                  addFiles(e.dataTransfer.files);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    browse();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <UploadBadge $active={dragging}>
                  <Upload size={14} strokeWidth={1.9} />
                </UploadBadge>
                <DropText>
                  {dragging ? (
                    "Drop to upload"
                  ) : (
                    <>
                      Drag and drop or <span>browse files</span>
                    </>
                  )}
                </DropText>
                <Caption>Max file size: 20 MB</Caption>
                <input
                  hidden
                  multiple
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                  ref={inputRef}
                  type="file"
                />
              </Dropzone>

              <List style={{ marginTop: files.length ? 4 : 0 }}>
                <AnimatePresence initial={false}>
                  {files.map((f) => (
                    <Row key={f.id} {...rowMotion}>
                      <FileRow file={f} onRemove={() => remove(f.id)} paused={paused} />
                    </Row>
                  ))}
                </AnimatePresence>
              </List>

              <Footer ref={menuRef}>
                <IconButton
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  aria-label="More options"
                  onClick={() => setMenuOpen((v) => !v)}
                  style={{ width: 20, marginLeft: 1 }}
                  type="button"
                >
                  <EllipsisVertical size={13} strokeWidth={1.8} />
                </IconButton>
                <Divider />
                <TextButton
                  disabled={!files.length}
                  onClick={() => {
                    speeds.current.clear();
                    setFiles([]);
                  }}
                  type="button"
                >
                  <Trash2 size={12} strokeWidth={1.6} />
                  Remove all
                </TextButton>
                <PrimaryButton
                  $busy={uploading}
                  aria-live="polite"
                  disabled={uploading}
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  {uploading ? (paused ? "Paused" : "Uploading...") : "Done"}
                </PrimaryButton>

                <AnimatePresence>
                  {menuOpen ? (
                    <Menu
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      initial={{ opacity: 0, scale: 0.96 }}
                      role="menu"
                      transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <button
                        disabled={!uploading}
                        onClick={() => {
                          setPaused((v) => !v);
                          setMenuOpen(false);
                        }}
                        role="menuitem"
                        style={uploading ? undefined : { opacity: 0.4, cursor: "default" }}
                        type="button"
                      >
                        {paused ? "Resume uploads" : "Pause uploads"}
                      </button>
                      <button
                        onClick={() => {
                          browse();
                          setMenuOpen(false);
                        }}
                        role="menuitem"
                        type="button"
                      >
                        Add files…
                      </button>
                      <button
                        onClick={() => {
                          speeds.current.clear();
                          setPaused(false);
                          setFiles(seed());
                          setMenuOpen(false);
                        }}
                        role="menuitem"
                        type="button"
                      >
                        Reset demo
                      </button>
                    </Menu>
                  ) : null}
                </AnimatePresence>
              </Footer>
            </Card>
          ) : (
            <Reopen
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.96 }}
              key="reopen"
              onClick={() => setOpen(true)}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              type="button"
            >
              <Upload size={14} strokeWidth={1.9} />
              Upload files
            </Reopen>
          )}
        </AnimatePresence>
      </CardWrap>

      <Credit style={{ left: "calc(7.8% + 26px)" }}>
        <Avatar>d</Avatar>
        <a href="https://disarto.co" rel="noreferrer" target="_blank">
          disarto.co
        </a>
      </Credit>
      <Credit style={{ right: "calc(7.8% + 26px)" }}>Upload files</Credit>
    </Stage>
  );
};

export default UploadFiles;
