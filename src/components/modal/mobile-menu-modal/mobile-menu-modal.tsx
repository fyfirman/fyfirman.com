import { useEffect } from "react";
// @ts-expect-error ignore assets
import Moon from "@assets/images/moon-sharp.svg";
// @ts-expect-error ignore assets
import Sun from "@assets/images/sunny-sharp.svg";
import { useRouter } from "next/router";
import styles from "./mobile-menu-modal.module.scss";
import { ModalProps } from "~/interfaces/modal";
import useAppDarkMode from "~/hooks/useAppDarkMode";
import { clsx } from "~/helpers/classname-helper";

const menuList = [
  { title: "Home", url: "/" },
  { title: "Message", url: "/message" },
  { title: "About", url: "/about" },
];

const MobileMenuModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const [isDarkMode, toggleDarkMode] = useAppDarkMode();
  const router = useRouter();

  useEffect(() => {
    if (!visible) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  }, [visible]);

  const navigateTo = (to: string) => {
    if (onClose) onClose();
    void router.push(to);
  };

  return (
    <div className={clsx([styles.root, visible && styles.visible])}>
      {menuList.map((menu, index) => (
        <a
          key={index}
          className={styles.menu}
          onClick={() => navigateTo(menu.url)}
          onKeyPress={() => navigateTo(menu.url)}
        >
          {menu.title}
        </a>
      ))}

      <a className={styles.menu} onClick={toggleDarkMode} onKeyPress={toggleDarkMode}>
        {isDarkMode ? (
          <img alt="Dark Mode Icon" src={Moon as string} />
        ) : (
          <img alt="Light Mode Icon" src={Sun as string} />
        )}
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </a>
    </div>
  );
};

export default MobileMenuModal;
