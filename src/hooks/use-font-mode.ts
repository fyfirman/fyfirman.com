import { useState, useEffect } from "react";

type FontMode = "serif" | "sans-serif";

const STORAGE_KEY = "blog-font-mode";
const DEFAULT_FONT_MODE: FontMode = "serif";

const useFontMode = () => {
  const [fontMode, setFontMode] = useState<FontMode>(DEFAULT_FONT_MODE);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as FontMode | null;
      if (stored === "serif" || stored === "sans-serif") {
        setFontMode(stored);
      } else {
        setFontMode(DEFAULT_FONT_MODE);
      }
    }
  }, []);

  const toggleFontMode = () => {
    setFontMode((currentMode) => {
      const newMode: FontMode = currentMode === "serif" ? "sans-serif" : "serif";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, newMode);
      }
      return newMode;
    });
  };

  return {
    fontMode: isClient ? fontMode : DEFAULT_FONT_MODE,
    toggleFontMode,
  };
};

export default useFontMode;
