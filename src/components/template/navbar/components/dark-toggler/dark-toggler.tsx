import Moon from "@assets/images/moon-sharp.svg";
import Sun from "@assets/images/sunny-sharp.svg";
import useAudio from "~/hooks/useAudio";
import styles from "./dark-toggler.module.scss";
import Image from "next/image";
import { useDarkMode } from "next-dark-mode";

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
    <button onClick={handleToggle} className={styles["dark-toggler"]}>
      {darkModeActive ? (
        <Image src={Moon} alt="Dark Mode Icon" />
      ) : (
        <Image src={Sun} alt="Light Mode Icon" />
      )}
    </button>
  );
};

export default DarkToggler;
