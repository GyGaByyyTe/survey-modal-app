import React, { forwardRef } from "react";
import clsx from "src/utils/clsx";
import { useForm } from "src/hooks";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
  name: string;
  value: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, value, label, required, error, disabled }, ref) => {
    const fieldId = `checkbox_${name}_${value}`;
    const { formValues, formErrors, updateFormValue } = useForm();

    // For multiple checkboxes, we store an array of selected values
    const selectedValues = (formValues[name] as string[]) || [];
    const isChecked = selectedValues.includes(value);
    const fieldError = formErrors[name] || error;

    const handleChange = () => {
      if (!disabled) {
        if (isChecked) {
          // Remove value from an array
          updateFormValue(
            name,
            selectedValues.filter((v) => v !== value)
          );
        } else {
          // Add value to array
          updateFormValue(name, [...selectedValues, value]);
        }
      }
    };

    return (
      <div className={styles.checkboxContainer}>
        <div
          className={clsx(styles.checkboxWrapper, {
            [styles.checked]: isChecked,
            [styles.disabled]: disabled,
            [styles.error]: fieldError !== undefined,
          })}
        >
          <input
            type="checkbox"
            id={fieldId}
            name={name}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className={clsx(styles.checkboxInput, {
              [styles.error]: fieldError !== undefined,
            })}
            ref={ref}
          />
          <span className={styles.checkboxCustom} />
        </div>
        <label
          htmlFor={fieldId}
          className={clsx(styles.checkboxLabel, {
            [styles.error]: fieldError !== undefined,
          })}
        >
          {label ?? value}
          {!required && <span className={styles.optional}> (optional)</span>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
