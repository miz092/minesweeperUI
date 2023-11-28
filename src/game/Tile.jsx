import React, { useState, useEffect } from "react";
import styles from "./Game.module.css";

const fieldTypeToClassName = {
  FREE_0: "revealed_empty",
  FREE_1: "revealed_one",
  FREE_2: "revealed_two",
  FREE_3: "revealed_three",
  FREE_4: "revealed_four",
  FREE_5: "revealed_five",
  FREE_6: "revealed_six",
  FREE_7: "revealed_seven",
  FREE_8: "revealed_eight",
  MARKED_MINE: "flagged",
  COVERED: "covered",
  TRUE_MINE: "revealed_mine",
  COVERED_FREE_0: "covered_empty",
  COVERED_FREE_1: "covered_one",
  COVERED_FREE_2: "covered_two",
  COVERED_FREE_3: "covered_three",
  COVERED_FREE_4: "covered_four",
  COVERED_FREE_5: "covered_five",
  COVERED_FREE_6: "covered_six",
  COVERED_FREE_7: "covered_seven",
  COVERED_FREE_8: "covered_eight",
  COVERED_MULTI_FREE: "covered_multi-free",
  COVERED_MINE: "covered_mine",
  PHANTOM_MINE: "phantom_mine",
  WRONGLY_MARKED_MINE: "wrongly_marked_mine",
  NOT_NECESSARILY_MINE: "not_necessarily_mine",
  QUESTION_MARK: "question",
};
const clickableTypes = ["COVERED", "FLAGGED", "QUESTION_MARK"];
const revealedTypes = [];

const nonClickableTypes = [
  "FREE_0",
  "FREE_1",
  "FREE_2",
  "FREE_3",
  "FREE_4",
  "FREE_5",
  "FREE_6",
  "FREE_7",
  "FREE_8",
  "COVERED_FREE_0",
  "COVERED_FREE_1",
  "COVERED_FREE_2",
  "COVERED_FREE_3",
  "COVERED_FREE_4",
  "COVERED_FREE_5",
  "COVERED_FREE_6",
  "COVERED_FREE_7",
  "COVERED_FREE_8",
  "COVERED_MULTI_FREE",
  "COVERED_MINE",
  "PHANTOM_MINE",
  "WRONGLY_MARKED_MINE",
  "NOT_NECESSARILY_MINE",
  "TRUE_MINE",
];

const Tile = ({
  coordinates,
  fieldType,
  onMouseDown,
  onMouseUp,
  updateState,
}) => {
  const field = fieldTypeToClassName[fieldType];

  const [internalState, setInternalState] = useState("");

  useEffect(() => {
    if (clickableTypes.includes(fieldType)) {
      setInternalState("COVERED");
    } else if (nonClickableTypes.includes(fieldType)) {
      setInternalState("REVEALED");
    } else {
      setInternalState("COVERED");
    }
  }, [fieldType]);

  const handleClick = (isRightClick) => {
    const interaction = {
      row: coordinates.y,
      col: coordinates.x,
      rightClick: isRightClick,
    };

    updateState(interaction);
    return false;
  };
  const handleRightClick = (e) => {
    // internalState = getInternalState(fieldType);
    e.preventDefault();
    // e.stopPropagation();

    const interaction = {
      row: coordinates.y,
      col: coordinates.x,
      rightClick: true,
    };
    updateState(interaction);
    return false;
  };

  const className = field ? `${styles.tile} ${styles[field]}` : styles.tile;

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={() => handleClick(false)}
      onContextMenu={(e) => {
        handleRightClick(e);
      }}

      // onTouchEnd={handleTouchEnd}
    />
  );
};

export default Tile;
