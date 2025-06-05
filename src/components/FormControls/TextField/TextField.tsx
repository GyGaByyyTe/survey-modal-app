import React, { forwardRef, ChangeEvent } from "react";
import { FormControlProps } from "src/types";
import clsx from "src/utils/clsx";
import { useForm } from "src/hooks";
import ErrorIcon from "src/components/ErrorIcon";

import styles from "./TextField.module.css";

type TextFieldProps = FormControlProps;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ question, error, disabled }, ref) => {
    const fieldId = question?.name;
    const { formValues, formErrors, updateFormValue } = useForm();

    const value = (formValues[fieldId] as string) || "";
    const fieldError = formErrors[fieldId] || error;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      updateFormValue(fieldId, e.target.value);
    };

    return (
      <div className={styles.inputContainer}>
        <input
          type="text"
          id={fieldId}
          name={fieldId}
          className={clsx(styles.textField, {
            [styles.error]: fieldError,
            [styles.disabled]: disabled,
          })}
          placeholder="Type your answer here..."
          disabled={disabled}
          ref={ref}
          value={value}
          onChange={handleChange}
        />
        {fieldError && <ErrorIcon error={fieldError} />}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
