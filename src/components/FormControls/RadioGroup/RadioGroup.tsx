import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { FormControlProps } from "src/types";
import clsx from "src/utils/clsx";
import { useForm } from "src/hooks";
import styles from "./RadioGroup.module.css";

type RadioGroupProps = FormControlProps;

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ question, error, disabled }, ref) => {
    const fieldId = question?.name;
    const { formValues, formErrors, updateFormValue } = useForm();
    const selectedOption = (formValues[fieldId] as string) || null;
    const fieldError = formErrors[fieldId] || error;
    const firstInputRef = useRef<HTMLInputElement>(null);

    // Forward the ref to the first radio input
    useImperativeHandle(ref, () => firstInputRef.current!, []);

    const handleChange = (option: string) => {
      if (!disabled) {
        updateFormValue(fieldId, option);
      }
    };

    return (
      <div className={styles.radioGroup}>
        {question.options?.map((option, optionIndex) => {
          const radioId = `${fieldId}_${optionIndex}`;
          const isChecked = selectedOption === option;

          return (
            <div key={optionIndex} className={styles.radioItem}>
              <div
                className={clsx(styles.radioContainer, {
                  [styles.checked]: isChecked,
                  [styles.disabled]: disabled,
                  [styles.error]: fieldError !== undefined,
                })}
              >
                <input
                  type="radio"
                  id={radioId}
                  name={fieldId}
                  value={option}
                  checked={isChecked}
                  onChange={() => handleChange(option)}
                  disabled={disabled}
                  className={styles.radioInput}
                  ref={optionIndex === 0 ? firstInputRef : null}
                />
                <span className={styles.radioCustom}></span>
              </div>
              <label
                htmlFor={radioId}
                className={clsx(styles.radioLabel, {
                  [styles.error]: fieldError !== undefined,
                })}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
