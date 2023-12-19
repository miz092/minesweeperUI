import styles from "./app.module.css";
import React from "react";
import { useEffect } from "react";
import Draggable from "react-draggable";

function Modal({ title, onClose, children }) {
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
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    // <Draggable handle={`.${styles.modalTitle}`}>
    <div className={`${styles["modal-overlay"]}`}>
      <div className={`${styles["modal"]}`}>
        <div className={`${styles["modalTitle"]}`}>
          {title}
          <div
            onClick={(e) => {
              handleClose(e);
            }}
          >
            <div className={styles["close-modal-button"]} />
          </div>
        </div>
        {children}
      </div>
    </div>
    // </Draggable>
  );
}

export default Modal;
