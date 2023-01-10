import { useEffect } from "react";
import Moon from "@assets/images/moon-sharp.svg";
import Sun from "@assets/images/sunny-sharp.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { ModalProps } from "~/interfaces/modal";
import useAppDarkMode from "~/hooks/useAppDarkMode";
import { clsx } from "~/helpers/classname-helper";
import styles from "./mobile-menu-modal.module.scss";

const menuList: { title: string; url: string }[] = [
  { title: "Home", url: "/" },
  { title: "Blog", url: "/blog" },
  { title: "Message", url: "/message" },
  // { title: "About", url: "/about" },
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
        <Link key={index} href={menu.url} passHref>
          <a
            className={styles.menu}
            href={menu.url}
            onClick={() => navigateTo(menu.url)}
            onKeyPress={() => navigateTo(menu.url)}
          >
            {menu.title}
          </a>
        </Link>
      ))}

      <button className={styles.menu} onClick={toggleDarkMode} onKeyPress={toggleDarkMode}>
        {isDarkMode ? (
          <Image alt="Dark Mode Icon" src={Moon as string} />
        ) : (
          <Image alt="Light Mode Icon" src={Sun as string} />
        )}
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default MobileMenuModal;
