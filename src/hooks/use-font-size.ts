import { useState, useEffect } from "react";

type FontSize = "xs" | "s" | "m" | "l" | "xl";

const STORAGE_KEY = "blog-font-size";
const DEFAULT_FONT_SIZE: FontSize = "s";

const useFontSize = () => {
  const [fontSize, setFontSizeState] = useState<FontSize>(DEFAULT_FONT_SIZE);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY) as FontSize | null;
      if (stored === "xs" || stored === "s" || stored === "m" || stored === "l" || stored === "xl") {
        setFontSizeState(stored);
      } else {
        setFontSizeState(DEFAULT_FONT_SIZE);
      }
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, size);
    }
  };

  return {
    fontSize: isClient ? fontSize : DEFAULT_FONT_SIZE,
    setFontSize,
  };
};

export default useFontSize;
