import React from "react";
import styles from "./Game.module.css";

function Smiley(props) {
  const stateToClassName = {
    NORMAL: "",
    LOSE: styles["lose"],
    SCARED: styles["scared"],
    WIN: styles["win"],
  };

  const className = `${styles["smiley"]} ${stateToClassName[props.state]}`;
  console.log(className);

  return <div className={className} onClick={props.onReset} />;
}

export default Smiley;
