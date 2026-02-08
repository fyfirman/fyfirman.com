import React from "react";
import styles from "./font-toggle.module.scss";

type FontMode = "serif" | "sans-serif";
type FontSize = "xs" | "s" | "m" | "l" | "xl";

interface FontToggleProps {
  fontMode: FontMode;
  toggleFontMode: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontToggle: React.FC<FontToggleProps> = ({ fontMode, toggleFontMode, fontSize, setFontSize }) => {
  const sizeOptions: FontSize[] = ["xs", "s", "m", "l", "xl"];
  const sizeLabels: Record<FontSize, string> = {
    xs: "XS",
    s: "S",
    m: "M",
    l: "L",
    xl: "XL",
  };

  return (
    <div className={styles.container}>
      <div className={styles.fontTypeGroup}>
        <button
          type="button"
          className={`${styles.option} ${fontMode === "serif" ? styles.active : ""}`}
          onClick={() => {
            if (fontMode !== "serif") {
              toggleFontMode();
            }
          }}
        >
          Serif
        </button>
        <button
          type="button"
          className={`${styles.option} ${fontMode === "sans-serif" ? styles.active : ""}`}
          onClick={() => {
            if (fontMode !== "sans-serif") {
              toggleFontMode();
            }
          }}
        >
          Sans Serif
        </button>
      </div>
      <div className={styles.separator} />
      <div className={styles.sizeGroup}>
        {sizeOptions.map((size) => (
          <button
            key={size}
            type="button"
            className={`${styles.option} ${styles.sizeOption} ${fontSize === size ? styles.active : ""}`}
            onClick={() => setFontSize(size)}
          >
            {sizeLabels[size]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontToggle;
