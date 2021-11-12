import Moon from "@assets/images/moon-sharp.svg";
import Sun from "@assets/images/sunny-sharp.svg";
import Image from "next/image";
import { useDarkMode } from "next-dark-mode";
import styles from "./dark-toggler.module.scss";
import useAudio from "~/hooks/useAudio";

const DarkToggler = () => {
  const { switchToDarkMode, switchToLightMode, darkModeActive } = useDarkMode();
  const [, toggleSwitchOn] = useAudio("/audio/switch-on.mp3");
  const [, toggleSwitchOff] = useAudio("/audio/switch-off.mp3");

  const handleToggle = () => {
    if (darkModeActive) {
      switchToLightMode();
      toggleSwitchOn();
    } else {
      switchToDarkMode();
      toggleSwitchOff();
    }
  };

  return (
    <button className={styles["dark-toggler"]} onClick={handleToggle}>
      {darkModeActive ? (
        <Image alt="Dark Mode Icon" src={Moon as string} />
      ) : (
        <Image alt="Light Mode Icon" src={Sun as string} />
      )}
    </button>
  );
};

export default DarkToggler;
