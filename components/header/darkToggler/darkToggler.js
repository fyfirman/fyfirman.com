import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Moon from "../../images/moon-sharp.svg"
import Sun from "../../images/sunny-sharp.svg"
import SwitchOn from "../../audio/switch-on.mp3"
import SwitchOff from "../../audio/switch-off.mp3"
import useAudio from "../../utils/useAudio"
import "./dark-toggler.scss"
import { Image } from 'next/image';

const DarkToggler = () => {
  const [, toggleAudioOn] = useAudio(SwitchOn);
  const [, toggleAudioOff] = useAudio(SwitchOff);

  return <ThemeToggler>
    {({ theme, toggleTheme }) => (
      <button
        onClick={() => {
          if (theme === 'dark') {
            toggleTheme('light');
            toggleAudioOn();
          } else {
            toggleTheme('dark');
            toggleAudioOff();
          }
        }}
        className="dark-toggler"
      >
        {theme !== 'dark' ? <Image src={Sun} alt="Light Mode" /> : <Image src={Moon} alt="Dark Mode" />}
      </button>
    )}
  </ThemeToggler>
}

export default DarkToggler