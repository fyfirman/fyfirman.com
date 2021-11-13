import { useEffect } from "react";
import styles from "./mobile-menu-modal.module.scss";
import { ModalProps } from "~/interfaces/modal";
import useAppDarkMode from "~/hooks/useAppDarkMode";

const menuList = ["Project", "Contact", "Message"];

const MobileMenuModal: React.FC<ModalProps> = ({ visible }) => {
  const [isDarkMode, toggleDarkMode] = useAppDarkMode();

  useEffect(() => {
    if (!visible) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.root}>
      {menuList.map((menu) => (
        <a key={menu} className={styles.menu}>
          {menu}
        </a>
      ))}
      <a
        className={styles.menu}
        onClick={toggleDarkMode}
        onKeyPress={toggleDarkMode}
      >
        {!isDarkMode ? "Dark Mode" : "Light Mode"}
      </a>
    </div>
  );
};

export default MobileMenuModal;
