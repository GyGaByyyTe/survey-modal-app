import React, { ReactNode } from "react";
import { FormProvider } from "src/hooks";

interface FormProps {
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return <FormProvider>{children}</FormProvider>;
};

export default Form;
