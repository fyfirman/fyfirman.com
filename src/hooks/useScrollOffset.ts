import { useCallback, useEffect, useState } from "react";

const useScrollOffset = (offset: number) => {
  const [isExceed, setIsExceed] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    setIsExceed(currentScrollPos > offset);
  }, [setIsExceed, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isExceed;
};

export default useScrollOffset;
