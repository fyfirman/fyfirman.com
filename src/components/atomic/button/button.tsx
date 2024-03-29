import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { clsx } from "~/helpers/classname-helper";
import styles from "./button.module.scss";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, variant, ...rest } = props;

  return (
    <button className={clsx([styles.root, variant && styles[variant], className])} {...rest}>
      {children}
    </button>
  );
};

export default Button;
