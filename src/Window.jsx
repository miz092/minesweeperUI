import { Link } from "react-router-dom";
import styles from "./app.module.css";
import React from "react";

function Window(props) {
  const isModal = props.isModal || false;
  const onClose = props.onClose;

  return (
    <>
      {isModal && <div className={styles["modal-overlay"]} />}
      <div className={`${styles["window"]}`}>
        <div className={styles["title"]}>
          {props.title}
          {isModal ? (
            <div className={styles["close-window-button"]} onClick={onClose} />
          ) : (
            <Link to="/">
              <div className={styles["close-window-button"]} />
            </Link>
          )}
        </div>
        {props.children}
      </div>
    </>
  );
}

export default Window;
