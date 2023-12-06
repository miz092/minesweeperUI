import React, { useRef, useState, useEffect } from "react";
import styles from "./Game.module.css";

import { Grow, Tooltip } from "@mui/material";

const fieldTypeToDescription = {
  FREE_0: "",
  FREE_1: 1,
  FREE_2: 2,
  FREE_3: 3,
  FREE_4: 4,
  FREE_5: 5,
  FREE_6: 6,
  FREE_7: 7,
  FREE_8: 8,
  MARKED_MINE: "This field holds a mine and was marked as such.",
  COVERED: "This field remained covered.",
  TRUE_MINE:
    "This field held a mine and you (or the automatic assistant on your behalf) stepped on it.",
  COVERED_FREE_0:
    "You'd find this field completely empty if you clicked on it, with no mines around it.",
  COVERED_FREE_1: "You'd find the number 1 if you clicked this field.",
  COVERED_FREE_2: "You'd find the number 2 if you clicked this field.",
  COVERED_FREE_3: "You'd find the number 3 if you clicked this field.",
  COVERED_FREE_4: "You'd find the number 4 if you clicked this field.",
  COVERED_FREE_5: "You'd find the number 5 if you clicked this field.",
  COVERED_FREE_6: "You'd find the number 6 if you clicked this field.",
  COVERED_FREE_7: "You'd find the number 7 if you clicked this field.",
  COVERED_FREE_8: "You'd find the number 8 if you clicked this field.",
  COVERED_MULTI_FREE:
    "This field is empty but the number on it could not be determined. These are the actual   fields you must eliminate before you are allowed to guess - mere empty fields with a single number on them do not stop you from guessing.",

  COVERED_MINE: "This field holds a mine but was not marked as such.",
  PHANTOM_MINE:
    "You (or the automatic assistant) guessed by stepping on this field, but you weren't allowed to guess, so you got MINED.",
  WRONGLY_MARKED_MINE: "This field was marked as a mine but it was emtpy.",
  NOT_NECESSARILY_MINE:
    "This field was marked as a mine and it could have held a one but it could have been empty as well.",
};
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
};
const tileToVibrate = ["covered", "flagged"];

const Tile = ({
  coordinates,
  fieldType,
  onMouseDown,
  onMouseUp,
  updateState,
  gameEnded,
}) => {
  const tileRef = useRef(null);
  const updateTimerRef = useRef(null);
  const vibrationTimerRef = useRef(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const field = fieldTypeToClassName[fieldType];
  const description = fieldTypeToDescription[fieldType];

  useEffect(() => {
    const tileElement = tileRef.current;

    const handleTouchStart = (e) => {
      setIsLongPress(false);

      e.preventDefault();

      updateTimerRef.current = setTimeout(() => {
        setIsLongPress(true);
        const interaction = {
          row: coordinates.y,
          col: coordinates.x,
          rightClick: true,
        };
        updateState(interaction);
      }, 300);

      vibrationTimerRef.current = setTimeout(() => {
        let shouldVibrate = tileToVibrate.includes(field);
        if ("vibrate" in navigator && shouldVibrate) {
          navigator.vibrate(50);
        }
      }, 450);
    };

    const handleTouchEnd = (e) => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
      if (vibrationTimerRef.current) {
        clearTimeout(vibrationTimerRef.current);
      }

      if (!isLongPress) {
        handleClick(e);
      }

      setIsLongPress(false);
    };

    tileElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    tileElement.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    return () => {
      tileElement.removeEventListener("touchstart", handleTouchStart);
      tileElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [updateState, coordinates, field]);

  const handleClick = (e) => {
    if (!isLongPress) {
      const interaction = {
        row: coordinates.y,
        col: coordinates.x,
        rightClick: e.button === 2,
      };
      updateState(interaction);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    const interaction = {
      row: coordinates.y,
      col: coordinates.x,
      rightClick: true,
    };
    updateState(interaction);
  };

  const className = field ? `${styles.tile} ${styles[field]}` : styles.tile;

  return (
    <Tooltip
      followCursor
      title={
        gameEnded === "MSG_CONTINUE" ? null : (
          <p style={{ fontSize: "1rem" }}>{description}</p>
        )
      }
      placement="top"
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 600 }}
      // enterDelay={200}
      // leaveDelay={500}
    >
      <div
        ref={tileRef}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={handleClick}
        onContextMenu={handleRightClick}
      />
    </Tooltip>
  );
};

export default Tile;
