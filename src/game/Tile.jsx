import React, { useRef, useState, useEffect } from "react";
import styles from "./Game.module.css";

import { Grow, Tooltip } from "@mui/material";
const fieldData = [
  {
    name: "FREE_0",
    data: {
      lowercaseName: "revealed_empty",
      description: "",
      hasDescription: false,
    },
  },
  {
    name: "FREE_1",
    data: {
      lowercaseName: "revealed_one",
      description: "1",
      hasDescription: false,
    },
  },
  {
    name: "FREE_2",
    data: {
      lowercaseName: "revealed_two",
      description: "2",
      hasDescription: false,
    },
  },
  {
    name: "FREE_3",
    data: {
      lowercaseName: "revealed_three",
      description: "3",
      hasDescription: false,
    },
  },
  {
    name: "FREE_4",
    data: {
      lowercaseName: "revealed_four",
      description: "4",
      hasDescription: false,
    },
  },
  {
    name: "FREE_5",
    data: {
      lowercaseName: "revealed_five",
      description: "5",
      hasDescription: false,
    },
  },
  {
    name: "FREE_6",
    data: {
      lowercaseName: "revealed_six",
      description: "6",
      hasDescription: false,
    },
  },
  {
    name: "FREE_7",
    data: {
      lowercaseName: "revealed_seven",
      description: "7",
      hasDescription: false,
    },
  },
  {
    name: "FREE_8",
    data: {
      lowercaseName: "revealed_eight",
      description: "8",
      hasDescription: false,
    },
  },
  {
    name: "MARKED_MINE",
    data: {
      lowercaseName: "flagged",
      description: "This field holds a mine and was marked as such.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED",
    data: {
      lowercaseName: "covered",
      description:
        "This field might or might not hold a mine; now we'll never know",
      hasDescription: true,
    },
  },
  {
    name: "TRUE_MINE",
    data: {
      lowercaseName: "true_mine",
      description:
        "This field held a mine and you (or the automatic assistant on your behalf) stepped on it.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_0",
    data: {
      lowercaseName: "covered_empty",
      description:
        "You'd find this field completely empty if you clicked on it, with no mines around it.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_1",
    data: {
      lowercaseName: "covered_one",
      description: "You'd find the number 1 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_2",
    data: {
      lowercaseName: "covered_two",
      description: "You'd find the number 2 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_3",
    data: {
      lowercaseName: "covered_three",
      description: "You'd find the number 3 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_4",
    data: {
      lowercaseName: "covered_four",
      description: "You'd find the number 4 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_5",
    data: {
      lowercaseName: "covered_five",
      description: "You'd find the number 5 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_6",
    data: {
      lowercaseName: "covered_six",
      description: "You'd find the number 6 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_7",
    data: {
      lowercaseName: "covered_seven",
      description: "You'd find the number 7 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_FREE_8",
    data: {
      lowercaseName: "covered_eight",
      description: "You'd find the number 8 if you clicked this field.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_MULTI_FREE",
    data: {
      lowercaseName: "covered_multi-free",
      description:
        "This field is empty but the number on it could not be determined. These are the actual fields you must eliminate before you are allowed to guess - mere empty fields with a single number on them do not stop you from guessing.",
      hasDescription: true,
    },
  },
  {
    name: "COVERED_MINE",
    data: {
      lowercaseName: "covered_mine",
      description: "This field holds a mine but was not marked as such.",
      hasDescription: true,
    },
  },
  {
    name: "PHANTOM_MINE",
    data: {
      lowercaseName: "phantom_mine",
      description:
        "You (or the automatic assistant) guessed by stepping on this field, but you weren't allowed to guess, so you got MINED.",
      hasDescription: true,
    },
  },
  {
    name: "WRONGLY_MARKED_MINE",
    data: {
      lowercaseName: "wrongly_marked_mine",
      description: "This field was marked as a mine but it was empty.",
      hasDescription: true,
    },
  },
  {
    name: "NOT_NECESSARILY_MINE",
    data: {
      lowercaseName: "not_necessarily_mine",
      description:
        "This field was marked as a mine and it could have held a one but it could have been empty as well.",
      hasDescription: true,
    },
  },
];
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
  isLoading,
}) => {
  const tileRef = useRef(null);
  const updateTimerRef = useRef(null);
  const vibrationTimerRef = useRef(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const field = fieldTypeToClassName[fieldType];
  // const description = fieldTypeToDescription[fieldType];

  const fieldDataEntry = fieldData.find((f) => f.name === fieldType);

  const { lowercaseName, description, hasDescription } = fieldDataEntry.data;

  useEffect(() => {
    const tileElement = tileRef.current;

    const handleTouchStart = (e) => {
      if (isLoading) return;
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
    if (isLoading) {
      console.log("disallowed click");
      return;
    }
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
    if (isLoading) return;
    e.preventDefault();
    const interaction = {
      row: coordinates.y,
      col: coordinates.x,
      rightClick: true,
    };
    updateState(interaction);
  };

  const className = lowercaseName
    ? `${styles.tile} ${styles[lowercaseName]}`
    : styles.tile;
  // const className = field ? `${styles.tile} ${styles[field]}` : styles.tile;
  return hasDescription ? (
    <Tooltip
      followCursor
      title={
        gameEnded === "MSG_CONTINUE" ? null : (
          <p style={{ fontSize: "1.3rem" }}>{description}</p>
        )
      }
      placement="middle"
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
  ) : (
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
