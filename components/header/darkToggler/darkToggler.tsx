import Moon from "../../../images/moon-sharp.svg";
import Sun from "../../../images/sunny-sharp.svg";
// import SwitchOn from "../../audio/switch-on.mp3";
// import SwitchOff from "../../audio/switch-off.mp3";
// import useAudio from "../../utils/useAudio";
import styles from "./dark-toggler.module.scss";
import Image from "next/image";
import { useDarkMode } from "next-dark-mode";

const DarkToggler = () => {
  const { switchToDarkMode, switchToLightMode, darkModeActive } = useDarkMode();
  // const [, toggleAudioOn] = useAudio(SwitchOn);
  // const [, toggleAudioOff] = useAudio(SwitchOff);

  const handleToggle = () => {
    if (darkModeActive) {
      switchToLightMode();
      // toggleAudioOn();
    } else {
      switchToDarkMode();
      // toggleAudioOff();
    }
  };

  return (
    <button onClick={handleToggle} className={styles["dark-toggler"]}>
      {darkModeActive ? <Image src={Moon} alt="Dark Mode" /> : <Image src={Sun} alt="Light Mode" />}
    </button>
  );
};

export default DarkToggler;
