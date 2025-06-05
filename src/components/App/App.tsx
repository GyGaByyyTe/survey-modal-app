import React, { useMemo } from "react";
import { fetchQuestions } from "src/services/api";
import { Question } from "src/types";
import { useFetch, useModal } from "src/hooks";
import Button from "src/components/Button";
import Modal from "src/components/Modal";

import styles from "./App.module.css";

const App: React.FC = () => {
  const { handleOpenModal } = useModal();
  const questions = useFetch<Question[]>(fetchQuestions);

  const questionsWithName = useMemo(() => {
    if (questions?.data) {
      return questions?.data.map((question, index) => ({
        ...question,
        name: `${question.type}_${index}`,
      }));
    }

    return [];
  }, [questions]);

  return (
    <div className={styles.app}>
      <div className={styles.buttonContainer}>
        <Button
          fullWidth
          variant="filled"
          onClick={handleOpenModal}
          disabled={questions.loading}
        >
          Open
        </Button>
        <p className={styles.helperText}>Take the survey</p>
      </div>

      {questions.loading && <p>Loading questions...</p>}

      {questions.error && (
        <p className={styles.error}>{String(questions.error)}</p>
      )}

      {!questions.loading && !questions.loading && questions.data && (
        <Modal questions={questionsWithName} />
      )}
    </div>
  );
};

export default App;
