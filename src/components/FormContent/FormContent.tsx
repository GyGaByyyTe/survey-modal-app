import React, { ReactNode } from "react";
import { Question } from "src/types";
import { useForm } from "src/hooks";
import clsx from "src/utils/clsx";
import Button from "src/components/Button";

interface FormContentProps {
  classes?: { [key: string]: string };
  questions: Question[];
  isLastPage: boolean;
  onNextPage: () => void;
  children: ReactNode;
}

const FormContent: React.FC<FormContentProps> = ({
  classes = {},
  questions,
  isLastPage,
  onNextPage,
  children,
}) => {
  const { validateForm } = useForm();

  const handleNextPage = () => {
    // Validate the form for the current page questions
    const isValid = validateForm(questions);

    if (isValid) {
      onNextPage();
    }
  };

  return (
    <>
      {children}
      <div className={clsx(classes.container)}>
        <Button fullWidth variant="filled" onClick={handleNextPage}>
          {isLastPage ? "Finish" : "Continue"}
        </Button>
      </div>
    </>
  );
};

export default FormContent;
