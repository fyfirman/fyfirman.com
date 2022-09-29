import React, { useCallback } from "react";
import styles from "./checkbox.module.scss";

interface CheckboxProps {
  id: string;
  label: string;
  onChange?: (value: boolean) => void;
}

const Checkbox: React.VFC<CheckboxProps> = ({ id, label, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (onChange) onChange(event.target.checked);
    },
    [onChange],
  );

  return (
    <label className={styles.container} htmlFor={id}>
      {label}
      <input className={styles.input} id={id} name={id} onChange={handleChange} type="checkbox" />
      <span className={styles.checkmark} />
    </label>
  );
};

export default Checkbox;
