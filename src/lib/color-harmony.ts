// Colour-theory palettes built in OKLCH, so rotated hues keep the same perceived lightness and saturation.

type Oklch = { l: number; c: number; h: number };

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function hexToOklch(hex: string): Oklch {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

function oklchToLinear({ l, c, h }: Oklch) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const L = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const M = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const S = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
}

// Lower chroma until the colour fits in sRGB, so hue and lightness survive the trip.
function oklchToHex(color: Oklch) {
  let lo = 0;
  let hi = color.c;
  let rgb = oklchToLinear(color);
  const inGamut = (v: number[]) => v.every((x) => x >= -1e-4 && x <= 1 + 1e-4);
  if (!inGamut(rgb)) {
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear({ ...color, c: mid }))) lo = mid;
      else hi = mid;
    }
    rgb = oklchToLinear({ ...color, c: lo });
  }
  return `#${rgb
    .map((v) =>
      Math.round(toGamma(Math.min(1, Math.max(0, v))) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

// Each swatch: [hue offset in degrees, lightness shift, chroma scale].
// Mixing deep shades and pale tints is what gives the gradient its depth.
type Recipe = [number, number, number][];

export const HARMONIES: { key: string; name: string; hint: string; recipe: Recipe }[] = [
  {
    key: "analogous",
    name: "Analogous",
    hint: "Neighbours on the wheel. Calm, cohesive.",
    recipe: [
      [0, 0, 1],
      [-30, 0.1, 0.9],
      [30, -0.12, 1],
      [-15, -0.32, 0.8],
      [15, 0.28, 0.45],
    ],
  },
  {
    key: "complementary",
    name: "Complementary",
    hint: "Opposite hues. Highest contrast.",
    recipe: [
      [0, 0, 1],
      [0, -0.32, 0.9],
      [180, 0, 1],
      [180, 0.22, 0.55],
      [0, 0.3, 0.3],
    ],
  },
  {
    key: "split",
    name: "Split complementary",
    hint: "The two neighbours of the opposite. Contrast with less tension.",
    recipe: [
      [0, 0, 1],
      [150, 0.06, 1],
      [210, -0.1, 1],
      [0, -0.32, 0.8],
      [180, 0.3, 0.3],
    ],
  },
  {
    key: "triadic",
    name: "Triadic",
    hint: "Three hues evenly spaced. Vivid and balanced.",
    recipe: [
      [0, 0, 1],
      [120, 0.04, 0.9],
      [240, -0.08, 0.9],
      [0, -0.32, 0.8],
      [120, 0.3, 0.35],
    ],
  },
  {
    key: "tetradic",
    name: "Tetradic",
    hint: "Two complementary pairs. Rich, needs a dominant colour.",
    recipe: [
      [0, 0, 1],
      [90, 0.08, 0.8],
      [180, -0.06, 0.9],
      [270, 0.2, 0.6],
      [0, -0.34, 0.7],
    ],
  },
  {
    key: "mono",
    name: "Monochromatic",
    hint: "One hue, many lightnesses. Quiet and elegant.",
    recipe: [
      [0, 0, 1],
      [0, -0.35, 0.8],
      [0, -0.16, 1],
      [6, 0.16, 0.7],
      [-6, 0.32, 0.35],
    ],
  },
];

export function harmonyPalette(base: string, recipe: Recipe) {
  const b = hexToOklch(base);
  // greys have no meaningful hue, so give them a little chroma to rotate
  const c = Math.max(b.c, 0.04);
  return recipe.map(([dh, dl, cs], i) =>
    i === 0 && dh === 0 && dl === 0
      ? base.toLowerCase()
      : oklchToHex({ l: Math.min(0.97, Math.max(0.12, b.l + dl)), c: c * cs, h: (b.h + dh + 360) % 360 }),
  );
}

export function randomBaseColor() {
  return oklchToHex({ l: 0.55 + Math.random() * 0.2, c: 0.1 + Math.random() * 0.08, h: Math.random() * 360 });
}
