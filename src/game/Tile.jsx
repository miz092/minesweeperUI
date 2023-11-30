import React, { useRef, useState, useEffect } from "react";
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
};
const tileToVibrate = ["covered", "flagged"];

const Tile = ({
  coordinates,
  fieldType,
  onMouseDown,
  onMouseUp,
  updateState,
}) => {
  const tileRef = useRef(null);
  const touchTimerRef = useRef(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const field = fieldTypeToClassName[fieldType];

  useEffect(() => {
    const tileElement = tileRef.current;

    const handleTouchStart = (e) => {
      setIsLongPress(false);
      if (e.cancelable) {
        e.preventDefault();
      }
      touchTimerRef.current = setTimeout(() => {
        setIsLongPress(true);
        const interaction = {
          row: coordinates.y,
          col: coordinates.x,
          rightClick: true,
        };
        let shouldVibrate = tileToVibrate.includes(field);
        if ("vibrate" in navigator && shouldVibrate) {
          navigator.vibrate(50);
        }
        updateState(interaction);
      }, 300);
    };

    const handleTouchEnd = (e) => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
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
  }, [updateState, coordinates]);

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
    <div
      ref={tileRef}
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    />
  );
};

export default Tile;
