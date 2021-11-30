import { useDarkMode } from "next-dark-mode";
import { useCallback } from "react";
import useAudio from "~/hooks/useAudio";

const useAppDarkMode = (): [boolean, () => void] => {
  const { switchToDarkMode, switchToLightMode, darkModeActive } = useDarkMode();
  const [, toggleSwitchOn] = useAudio("/audio/switch-on.mp3");
  const [, toggleSwitchOff] = useAudio("/audio/switch-off.mp3");

  const handleToggle = useCallback(() => {
    if (darkModeActive) {
      switchToLightMode();
      toggleSwitchOn();
    } else {
      switchToDarkMode();
      toggleSwitchOff();
    }
  }, [darkModeActive, switchToDarkMode, switchToLightMode, toggleSwitchOff, toggleSwitchOn]);

  return [darkModeActive, handleToggle];
};

export default useAppDarkMode;
