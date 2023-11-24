import { useEffect, useState } from "react";

import styles from "./Game.module.css";
import Tile from "./Tile";
import DigitsDisplay from "./DigitsDisplay";
import Smiley from "./Smiley";
import { updateGameState } from "../app/api.js";

function Game({ estate, board, start }) {
  const [restartGame, setRestartGame] = useState(false);
  const [mouseDownOnTile, setMouseDownOnTile] = useState(false);
  const [timerStarted, setTimerStarted] = useState(-1);
  const [timeToDisplay, setTimeToDisplay] = useState(0);

  let fieldTypeCounts = {};
  useEffect(() => {
    fieldTypeCounts = {};

    board.flat().forEach((tile) => {
      fieldTypeCounts[tile] = (fieldTypeCounts[tile] || 0) + 1;
    });

    // console.log("FieldType Counts:", fieldTypeCounts);
  }, [board]);

  const timer = () => {
    let interval = null;

    if (timerStarted >= 0) {
      interval = setInterval(() => {
        setTimeToDisplay((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  };

  useEffect(timer, [timerStarted]);
  useEffect(() => {
    setTimeToDisplay(0);
    setTimerStarted(-1);
    setRestartGame(false);

    start();
  }, [restartGame]);

  let mineCount = estate.mineCount;
  let flagCount = null;

  const gameEnded = false;
  const win = false;

  ////GAME STATE UPDATE FUNCTION
  const letsUpdateGameState = async (interaction) => {
    if (timerStarted < 0) {
      console.log("Tile click timer started: ", timerStarted, timerStarted);
      setTimerStarted(Date.now());
    }
    // console.log("this is interaction: ", interaction);
    let gameState = { board: board, engineState: null };

    try {
      let newState = await updateGameState(gameState, interaction);
    } catch (error) {
      console.error("Error updating game state:", error);
    }
  };

  return (
    <div className={`${styles["game"]} ${styles["outer-border"]}`}>
      <div className={`${styles["game-status"]} ${styles["inner-border"]}`}>
        <DigitsDisplay digits={3} value={mineCount - flagCount} />
        <Smiley
          state={
            gameEnded
              ? win
                ? "WIN"
                : "LOSE"
              : mouseDownOnTile
              ? "SCARED"
              : "NORMAL"
          }
          onReset={() => {
            setRestartGame(true);
            setTimerStarted(-1);
          }}
        />
        <DigitsDisplay digits={3} value={timeToDisplay} />
      </div>
      <div className={styles["inner-border"]}>
        {board.map((v, y) => (
          <div key={`row-${y}`} className={styles["row"]}>
            {v.map((tile, x) => (
              <Tile
                coordinates={{ x, y }}
                fieldType={tile}
                gameEnded={gameEnded}
                onMouseDown={(e) => e.button === 0 && setMouseDownOnTile(true)}
                onMouseUp={(e) => e.button === 0 && setMouseDownOnTile(false)}
                key={`${y}-${x}`}
                updateState={letsUpdateGameState}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
