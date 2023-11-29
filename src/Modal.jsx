import styles from "./app.module.css";
import React from "react";

function Modal({ title, onClose, children }) {
  return (
    <div className={`${styles["modal-overlay"]}`}>
      <div className={`${styles["modal"]}`}>
        <div className={styles["title"]}>
          {title}
          <div to="/" onClick={() => onClose(null)}>
            <div className={styles["close-modal-button"]} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
