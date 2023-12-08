import styles from "./app.module.css";
import React from "react";
import { useEffect } from "react";

function Modal({ title, onClose, message, children }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className={`${styles["modal-overlay"]}`}>
      <div className={`${styles["modal"]}`}>
        <div className={styles["title"]}>
          {title}
          <div to="/" onClick={() => onClose()}>
            <div className={styles["close-modal-button"]} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
