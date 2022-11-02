/* eslint-disable react-hooks/rules-of-hooks -- need to be ignore the rest of code if is it SSR */
import { useState, useEffect } from "react";

const useAudio = (url: string): [boolean, () => void] => {
  if (typeof window === "undefined") return [false, () => {}];

  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      void audio.play();
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    audio.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audio]);

  return [isPlaying, toggle];
};

export default useAudio;
