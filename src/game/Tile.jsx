import React, { useRef, useState, useEffect } from "react";
import styles from "./Game.module.css";

import { Grow, Tooltip } from "@mui/material";

import fieldData from "./FieldData";

const tileToVibrate = ["covered", "flagged"];

const Tile = ({
  coordinates,
  fieldType,
  onMouseDown,
  onMouseUp,
  updateState,
  gameEnded,
  isLoading,
  isMouseDownGlobal,
}) => {
  const tileRef = useRef(null);
  const updateTimerRef = useRef(null);
  const vibrationTimerRef = useRef(null);

  const longPressRef = useRef(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const fieldDataEntry = fieldData.find((f) => f.name === fieldType);

  const { lowercaseName, description, hasDescription } = fieldDataEntry.data;

  useEffect(() => {
    const tileElement = tileRef.current;

    const handleTouchStart = (e) => {
      if (isLoading) return;
      longPressRef.current = false;

      if (e.cancelable) {
        e.preventDefault();
      }

      updateTimerRef.current = setTimeout(() => {
        longPressRef.current = true;
        const interaction = {
          row: coordinates.y,
          col: coordinates.x,
          rightClick: true,
        };
        updateState(interaction);
      }, 300);

      vibrationTimerRef.current = setTimeout(() => {
        let shouldVibrate = tileToVibrate.includes(lowercaseName);
        if ("vibrate" in navigator && shouldVibrate) {
          navigator.vibrate(50);
        }
      }, 500);
    };

    const handleTouchEnd = (e) => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
      if (vibrationTimerRef.current) {
        clearTimeout(vibrationTimerRef.current);
      }

      if (!longPressRef.current) {
        handleClick(e);
      }
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
  }, [updateState, coordinates, lowercaseName]);

  const handleClick = (e) => {
    if (isLoading || e.button !== 0) return;

    if (!longPressRef.current) {
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
    console.log("right click");
    const interaction = {
      row: coordinates.y,
      col: coordinates.x,
      rightClick: true,
    };
    updateState(interaction);
  };

  const className =
    isMouseDownGlobal && isMouseOver
      ? `${styles.tile} ${styles["revealed_empty"]}`
      : `${styles.tile} ${styles[lowercaseName]}`;

  const handleMouseDown = (e) => {
    if (!isLoading) {
      setIsMouseDown(true);
      onMouseDown(e);
    }
  };

  const handleMouseUp = (e) => {
    onMouseUp(e);
    if (e.button === 0) {
      handleClick(e);
    }
  };
  return hasDescription ? (
    <Tooltip
      followCursor
      title={
        gameEnded === "MSG_CONTINUE" ? null : (
          <p
            style={{ fontSize: "1.3rem", margin: "5px", lineHeight: "1.5rem" }}
          >
            {description}
          </p>
        )
      }
      placement="top"
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 600 }}
    >
      <div
        ref={tileRef}
        className={className}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => {
          setIsMouseOver(false);
        }}
        // onClick={handleMouseUp}
        onContextMenu={handleRightClick}
      />
    </Tooltip>
  ) : (
    <div
      ref={tileRef}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
      // onClick={handleMouseUp}
      onContextMenu={handleRightClick}
    />
  );
};

export default Tile;
