import React from "react";
import { Question as QuestionType } from "src/types";

import styles from "./Question.module.css";

interface QuestionProps {
  question: QuestionType;
  children: React.ReactNode;
}

const Question: React.FC<QuestionProps> = ({ question, children }) => {
  return (
    <div className={styles.formControl}>
      <label className={styles.label}>
        {question.text}
        {!question.required && (
          <span className={styles.optional}> (optional)</span>
        )}
      </label>
      <div className={styles.controlContainer}>{children}</div>
    </div>
  );
};

export default Question;
