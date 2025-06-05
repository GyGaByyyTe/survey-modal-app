import React, {
  useRef,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FormControlProps } from "src/types";
import clsx from "src/utils/clsx";
import { useForm } from "src/hooks";
import ErrorIcon from "src/components/ErrorIcon";

import styles from "./TextArea.module.css";

type TextAreaProps = FormControlProps;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ question, error, disabled }, externalRef) => {
    const fieldId = question?.name;
    const { formValues, formErrors, updateFormValue } = useForm();
    const value = (formValues[fieldId] as string) || "";
    const fieldError = formErrors[fieldId] || error;
    const internalRef = useRef<HTMLTextAreaElement>(null);

    // Combine internal and external refs
    useImperativeHandle(externalRef, () => internalRef.current!, []);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      updateFormValue(fieldId, e.target.value);
    };

    const clearTextarea = () => {
      updateFormValue(fieldId, "");
      if (internalRef.current) {
        internalRef.current.focus();
      }
    };

    const hasContent = value.length > 0;
    const showClearButton = hasContent && !disabled;
    const showErrorIcon = fieldError !== undefined;

    const className = clsx(styles.textarea, {
      [styles.error]: fieldError,
      [styles.disabled]: disabled,
      [styles.hasClearButton]: showClearButton,
      [styles.hasBothIcons]: showClearButton && showErrorIcon,
    });

    return (
      <div className={styles.textareaContainer}>
        <textarea
          ref={internalRef}
          id={fieldId}
          name={fieldId}
          rows={4}
          className={className}
          placeholder="Type your answer here..."
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />
        {showClearButton && (
          <button
            type="button"
            className={clsx(styles.clearButton, {
              [styles.withError]: showErrorIcon,
            })}
            onClick={clearTextarea}
            aria-label="Clear text"
          >
            <span className={styles.clearIcon}></span>
          </button>
        )}
        {showErrorIcon && (
          <ErrorIcon
            error={fieldError}
            className={showClearButton ? styles.withClearButton : ""}
          />
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
