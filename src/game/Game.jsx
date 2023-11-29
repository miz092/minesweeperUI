import { useEffect, useState } from "react";

import styles from "./Game.module.css";
import Tile from "./Tile";
import DigitsDisplay from "./DigitsDisplay";
import Smiley from "./Smiley";
import { updateGameState } from "../app/api.js";

function Game({ estate, board, start, onGameEnd }) {
  const [restartGame, setRestartGame] = useState(false);
  const [mouseDownOnTile, setMouseDownOnTile] = useState(false);
  const [timerStarted, setTimerStarted] = useState(-1);
  const [timeToDisplay, setTimeToDisplay] = useState(0);
  const [currentBoard, setCurrentboard] = useState(board);
  const [currentEstate, setCurrentEstate] = useState(estate);
  const [remainingMines, setRemainingMines] = useState(estate?.mineCount);
  const [markedCount, setMarkedCount] = useState(estate?.markedCount);
  const [gameEnded, setGameEnded] = useState("MSG_CONTINUE");

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
    resetGame();
  }, [restartGame]);

  const resetGame = () => {
    setTimeToDisplay(0);
    setTimerStarted(-1);
    setRestartGame(false);
    start();
    setCurrentboard(board);
    setCurrentEstate(estate);
    setRemainingMines(estate?.mineCount);
    setMarkedCount(estate?.markedCount);
    setGameEnded("MSG_CONTINUE");
  };

  const letsUpdateGameState = async (interaction) => {
    if (timerStarted < 0) {
      setTimerStarted(Date.now());
    }
    let gameState = { board: currentBoard, engineState: currentEstate };

    try {
      let newState = await updateGameState(gameState, interaction);

      if (newState) {
        setRemainingMines(newState?.remainingMines);
        setCurrentboard(newState.state.board);
        setCurrentEstate(newState?.state.engineState);

        if (newState?.msg !== "MSG_CONTINUE") {
          setGameEnded(newState?.msg);
          onGameEnd(newState?.msg);

          setTimerStarted(-1);
        }
      }
    } catch (error) {
      console.error("Error updating game state:", error);
    }
  };
  return (
    <div className={`${styles["game"]} ${styles["outer-border"]}`}>
      <div className={`${styles["game-status"]} ${styles["inner-border"]}`}>
        <DigitsDisplay digits={3} value={remainingMines - markedCount} />
        <Smiley
          state={
            gameEnded === "MSG_CONGRATULATIONS"
              ? "win"
              : gameEnded === "MSG_STEPPED_ON_MINE" ||
                gameEnded === "MSG_ILLEGAL_GUESS"
              ? "lose"
              : mouseDownOnTile
              ? "scared"
              : "normal"
          }
          onReset={resetGame}
        />
        <DigitsDisplay digits={3} value={timeToDisplay} />
      </div>
      <div className={styles["inner-border"]}>
        {currentBoard.map((row, y) => (
          <div key={`row-${y}`} className={styles["row"]}>
            {row.map((tile, x) => (
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
