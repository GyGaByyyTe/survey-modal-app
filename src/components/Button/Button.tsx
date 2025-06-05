import React, { ButtonHTMLAttributes } from "react";
import clsx from "src/utils/clsx";

import styles from "./Button.module.css";

export type ButtonVariant = "filled" | "outlined";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  children,
  className = "",
  fullWidth = false,
  ...props
}) => (
  <button
    {...props}
    className={clsx(styles.button, styles[variant], className, {
      [styles.fullWidth]: fullWidth,
    })}
  >
    {children}
  </button>
);

export default Button;
