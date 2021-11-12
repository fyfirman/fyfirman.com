import { useState, useEffect } from "react";

const useAudio = (url: string): [boolean, () => void] => {
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
  }, []);

  return [isPlaying, toggle];
};

export default useAudio;
