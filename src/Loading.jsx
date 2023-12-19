import React from "react";
import styles from "./app.module.css";
import Hourglass from "./sprites/hourglass.webp";

const Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.loadingInnerBorder}>
        {" "}
        <img
          style={{ width: "200px", height: "200px" }}
          src={Hourglass}
          alt="Loading..."
          className={isLoading ? "loading-visible" : "loading"}
        />
      </div>
    </div>
  );
};

export default Loading;
