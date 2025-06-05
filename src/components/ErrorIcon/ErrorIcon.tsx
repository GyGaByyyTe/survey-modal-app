import React from "react";
import clsx from "src/utils/clsx";

import styles from "./ErrorIcon.module.css";

interface ErrorIconProps {
  error?: string;
  className?: string;
}

const ErrorIcon: React.FC<ErrorIconProps> = ({ error, className = "" }) => {
  return (
    <div className={clsx(styles.errorIcon, className)} title={error}>
      !
    </div>
  );
};

export default ErrorIcon;
