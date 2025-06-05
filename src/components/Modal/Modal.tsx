import React, { useEffect, useRef } from "react";
import { Question } from "src/types";
import { useModal } from "src/hooks";
import clsx from "src/utils/clsx";
import Form from "src/components/Form";
import FormContent from "src/components/FormContent";
import SuccessView from "src/components/SuccessView";
import QuestionComponent from "src/components/FormControls/Question";
import useModalPagination from "src/components/Modal/useModalPagination";
import {
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  SelectField,
  TextArea,
  TextField,
} from "src/components/FormControls";

import styles from "./Modal.module.css";

interface ModalProps {
  questions: Question[];
}

const Modal: React.FC<ModalProps> = ({ questions }) => {
  const { isOpen, isSuccess, handleCloseModal } = useModal();
  const firstInputRef = useRef<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    currentPage,
    handlePrevPage,
    isCalculatingPages,
    questionsContainerRef,
    questionsPerPage,
    totalPages,
    handleNextPage,
  } = useModalPagination({
    questions,
    selectorClass: styles.questionWrapper,
    modalRef,
  });

  // In case to close the modal by clicking outside
  /* const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  }; */

  // Focus on the first input when the modal opens or the page changes
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      // onClick={handleOverlayClick}
    >
      <button className={styles.closeButton} onClick={handleCloseModal}>
        <div className={styles.closeIcon} />
      </button>
      <div className={styles.modal} ref={modalRef}>
        {isSuccess && <SuccessView onClose={handleCloseModal} />}
        {!isSuccess && (
          <>
            <div className={styles.header}>
              {currentPage > 0 && (
                <button className={styles.backButton} onClick={handlePrevPage}>
                  <div className={styles.backIcon} />
                </button>
              )}
              <h2 className={styles.title}>Fill in the form</h2>
            </div>
            <Form>
              <div className={styles.content}>
                {isCalculatingPages && ( // Render all questions for measurement (hidden from view)
                  <div
                    className={clsx(
                      styles.questionsContainer,
                      styles.measurementContainer
                    )}
                    ref={questionsContainerRef}
                  >
                    {questions.map((question, index) => (
                      <div key={index} className={styles.questionWrapper}>
                        {renderFormControl(question, index, false, null)}
                      </div>
                    ))}
                  </div>
                )}

                {/* Render only current page questions for display */}
                <FormContent
                  classes={{ container: styles.buttonContainer }}
                  questions={questionsPerPage[currentPage] || []}
                  isLastPage={currentPage === totalPages - 1}
                  onNextPage={handleNextPage}
                >
                  <div className={styles.questionsContainer}>
                    {questionsPerPage[currentPage]?.map((question, index) => (
                      <div key={index} className={styles.questionWrapper}>
                        {renderFormControl(
                          question,
                          index,
                          index === 0,
                          firstInputRef
                        )}
                      </div>
                    ))}
                  </div>
                </FormContent>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

const renderFormControl = (
  question: Question,
  index: number,
  shouldFocus = false,
  inputRef: React.RefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > | null
) => {
  if (!question || !question.type) {
    return null;
  }

  if (question.type === "single-checkbox") {
    return (
      <Checkbox
        name={question.name}
        value={question.text}
        required={question.required}
        ref={
          shouldFocus ? (inputRef as React.RefObject<HTMLInputElement>) : null
        }
      />
    );
  }

  let child = null;

  switch (question.type) {
    case "select":
      child = (
        <SelectField
          question={question}
          ref={
            shouldFocus
              ? (inputRef as React.RefObject<HTMLSelectElement>)
              : null
          }
        />
      );
      break;
    case "multiple-checkbox":
      child = (
        <CheckboxGroup
          question={question}
          ref={
            shouldFocus ? (inputRef as React.RefObject<HTMLInputElement>) : null
          }
        />
      );
      break;
    case "radio":
      child = (
        <RadioGroup
          question={question}
          ref={
            shouldFocus ? (inputRef as React.RefObject<HTMLInputElement>) : null
          }
        />
      );
      break;
    case "textarea":
      child = (
        <TextArea
          question={question}
          ref={
            shouldFocus
              ? (inputRef as React.RefObject<HTMLTextAreaElement>)
              : null
          }
        />
      );
      break;
    case "text":
      child = (
        <TextField
          question={question}
          ref={
            shouldFocus ? (inputRef as React.RefObject<HTMLInputElement>) : null
          }
        />
      );
      break;
    default:
      break;
  }

  return (
    <QuestionComponent key={index} question={question}>
      {child}
    </QuestionComponent>
  );
};

export default Modal;
