import React from "react";
import styles from "./Game.module.css";

function Smiley(props) {
  const stateToClassName = {
    NORMAL: "",
    LOSE: styles["lose"],
    SCARED: styles["scared"],
    WIN: styles["win"],
  };
  console.log("clicked", props);
  const className = `${styles["smiley"]} ${stateToClassName[props.state]}`;

  return <div className={className} onClick={props.onReset} />;
}

export default Smiley;
