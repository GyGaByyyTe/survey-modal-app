import React, { forwardRef } from "react";
import { FormControlProps } from "src/types";
import Checkbox from "src/components/FormControls/Checkbox";

import styles from "./CheckboxGroup.module.css";

type CheckboxGroupProps = FormControlProps;

const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ question, error, disabled }, ref) => {
    const fieldId = question?.name;

    return (
      <div className={styles.checkboxGroup}>
        {question.options?.map((option, optionIndex) => (
          <Checkbox
            key={optionIndex}
            name={fieldId}
            value={option}
            error={error}
            disabled={disabled}
            required={question.required}
            ref={optionIndex === 0 ? ref : null}
          />
        ))}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;
