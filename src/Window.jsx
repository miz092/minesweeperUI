import { Link } from "react-router-dom";
import styles from "./app.module.css";
import React from "react";

function Window(props) {
  return (
    <>
      <div className={`${styles["window"]}`}>
        <div className={styles["title"]}>
          {props.title}
          <Link to="/">
            <div className={styles["close-window-button"]} />
          </Link>
        </div>
        {props.children}
      </div>
    </>
  );
}

export default Window;
