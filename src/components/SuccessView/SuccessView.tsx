import React from "react";
import Button from "src/components/Button";

import styles from "./SuccessView.module.css";

interface SuccessViewProps {
  onClose: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ onClose }) => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Successful</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.successIcon}>
          <div className={styles.checkmark} />
        </div>
        <h3 className={styles.heading}>Thanks for the info!</h3>
        <p className={styles.subheading}>
          This information is very important to us.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="outlined" fullWidth onClick={onClose}>
          Close
        </Button>
      </div>
    </>
  );
};

export default SuccessView;
