// Question types from the JSON
export type QuestionType =
  | "select"
  | "multiple-checkbox"
  | "radio"
  | "textarea"
  | "text"
  | "single-checkbox";

export interface Question {
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  name: string;
}

// Form state
export interface FormState {
  [key: string]: string | string[] | boolean;
}

// Form errors
export interface FormErrors {
  [key: string]: string;
}

// Base interface for form control components
export interface FormControlProps {
  question: Question;
  error?: string;
  disabled?: boolean;
}

// Survey state
export interface SurveyState {
  questions: Question[];
  currentStep: number;
  totalSteps: number;
  formState: FormState;
  formErrors: FormErrors;
  isSubmitting: boolean;
  isComplete: boolean;
  hasInteracted: boolean;
}
