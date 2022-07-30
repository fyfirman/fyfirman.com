import React from "react";
import styles from "./select.module.scss";
import { clsx } from "~/helpers/classname-helper";

export type SelectOption = { value: string | number; label?: string };

interface FieldProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  className?: string;
  options: SelectOption[];
}

const Select: React.VFC<FieldProps> = (props) => {
  const { placeholder, className, options, ...rest } = props;
  return (
    <select className={clsx([styles.container, className])} {...rest}>
      <option disabled hidden value="">
        {placeholder}
      </option>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label ?? item.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
