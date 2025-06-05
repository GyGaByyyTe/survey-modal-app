import React, { createContext, ReactNode, useContext, useState } from "react";
import { FormErrors, FormState, Question } from "src/types";
import { useModal } from "src/hooks/useModal";

interface FormContextType {
  formValues: FormState;
  formErrors: FormErrors;
  updateFormValue: (name: string, value: string | string[] | boolean) => void;
  validateForm: (questions: Question[]) => boolean;
  clearErrors: () => void;
}

const UseForm = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

/**
 * FormProvider is a React functional component that provides a context for managing a form's state,
 * including form values, validation errors, and interaction tracking.
 *
 * This context allows child components to access and manipulate form-related information and
 * functionality such as updating form fields, validating inputs, and clearing errors.
 *
 * The component uses React state hooks to store form values and errors, and integrates with
 * an external modal state to track user interaction with the form.
 *
 * Props:
 * - children (React.ReactNode): The child components that will have access to the form context.
 *
 * Context Provided:
 * - formValues (FormState): An object containing the current values of form fields.
 * - formErrors (FormErrors): An object containing validation error messages for form fields.
 * - updateFormValue (function): Updates the value of a specified form field and clears any validation error for that field.
 * - validateForm (function): Validates form fields based on an array of questions and their validation rules. Returns a boolean indicating whether the form is valid.
 * - clearErrors (function): Clears all validation errors in the form.
 */
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formValues, setFormValues] = useState<FormState>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setHasInteracted } = useModal();

  const updateFormValue = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setHasInteracted(true);
  };

  const validateForm = (questionsToValidate: Question[]): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    questionsToValidate.forEach((question) => {
      const fieldName = question.name;
      const value = formValues[fieldName];

      if (question.required) {
        if (
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          errors[fieldName] = "This field is required";
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const clearErrors = () => {
    setFormErrors({});
  };

  return (
    <UseForm.Provider
      value={{
        formValues,
        formErrors,
        updateFormValue,
        validateForm,
        clearErrors,
      }}
    >
      {children}
    </UseForm.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(UseForm);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
