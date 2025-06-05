import React, { ChangeEvent, forwardRef } from "react";
import { FormControlProps } from "src/types";
import clsx from "src/utils/clsx";
import ErrorIcon from "src/components/ErrorIcon";
import { useForm } from "src/hooks";
import styles from "./SelectField.module.css";

type SelectFieldProps = FormControlProps;

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ question, error, disabled }, ref) => {
    const fieldId = question?.name;
    const { formValues, formErrors, updateFormValue } = useForm();
    const value = (formValues[fieldId] as string) || "";
    const fieldError = formErrors[fieldId] || error;

    const className = clsx(styles.select, {
      [styles.error]: fieldError,
      [styles.disabled]: disabled,
      [styles.empty]: !value,
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      updateFormValue(fieldId, e.target.value);
    };

    return (
      <div className={styles.selectContainer}>
        <select
          id={fieldId}
          name={fieldId}
          className={className}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          ref={ref}
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {question.options?.map((option, optionIndex) => (
            <option key={optionIndex} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={styles.arrow}></span>
        {fieldError && (
          <ErrorIcon error={fieldError} className={styles.withError} />
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
