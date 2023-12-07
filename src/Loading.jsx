import React from "react";
import styles from "./app.module.css";
import Hourglass from "./sprites/hourglass.webp";

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <img src={Hourglass} alt="Loading..." className={styles.loadingGif} />
    </div>
  );
};

export default Loading;
