import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: 550,
  });

  const isTablet = useMediaQuery({
    minWidth: 551,
    maxWidth: 1080,
  });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);

  return {
    isMobile: isClient ? isMobile : false,
    isTablet: isClient ? isTablet : false,
    isClient,
  };
};

export default useResponsive;
