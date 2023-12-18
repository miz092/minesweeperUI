import React from "react";
import styles from "./Game.module.css";

function Smiley(props) {
  const stateToClassName = {
    normal: "",
    lose: styles["lose"],
    scared: styles["scared"],
    win: styles["win"],
  };
  const className = `${styles["smiley"]} ${stateToClassName[props.state]}`;

  return <div className={className} onMouseDownCapture={props.onReset} />;
}

export default Smiley;
