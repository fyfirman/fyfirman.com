import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./button.module.scss";
import { clsx } from "~/helpers/classname-helper";

const Button: React.FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button className={clsx([styles.root, className])} {...rest}>
      {children}
    </button>
  );
};

export default Button;
