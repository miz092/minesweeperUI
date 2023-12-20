import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Game.module.css";
import Tile from "./Tile";
import DigitsDisplay from "./DigitsDisplay";
import Smiley from "./Smiley";
import { updateGameState } from "../app/api.js";
import Loading from "../Loading.jsx";
import loadingGif from "../images/dialup.webp";
import Modal from "../Modal.jsx";
import Button from "../Button.jsx";
import ReactGA from "react-ga";
function Game({
  estate,
  board,
  start,
  onGameEnd,
  setRestartGame,
  restartGame,
  gameEnded,
  setGameEnded,
  gameFinished,
  setGameFinished,
  isLoading,
  setIsLoading,
  setIsExtendedLoading,
}) {
  const [mouseDownOnTile, setMouseDownOnTile] = useState(false);
  const [timerStarted, setTimerStarted] = useState(-1);
  const [timeToDisplay, setTimeToDisplay] = useState(0);
  const [currentBoard, setCurrentboard] = useState(board);
  const [currentEstate, setCurrentEstate] = useState(estate);
  const [remainingMines, setRemainingMines] = useState(estate?.mineCount);
  const [markedCount, setMarkedCount] = useState(estate?.markedCount);
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);

  const [firstInteraction, setFirstInteraction] = useState(false);
  const [isMouseDownGlobal, setIsMouseDownGlobal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const abortControllerRef = useRef(new AbortController());
  const TRACKING_ID = "G-1EJYGXJ5D3";
  // const TRACKING_ID = "G-RSMM8752NE";
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);
  useEffect(() => {
    start();
    ReactGA.event({
      category: "game_start",
      action: "game_started",
      label: "minesweeper",
    });
  }, []);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + "_game_started");
  }, []);
  const handleGlobalMouseLeave = () => {
    if (isMouseDownGlobal) {
      setMouseDownOnTile(false);
    }
  };
  const handleGlobalMouseDown = (e) => {
    if (e.button === 0) {
      setIsMouseDownGlobal(true);
    }
  };

  const handleGlobalMouseUp = (e) => {
    if (e.button === 0) {
      setIsMouseDownGlobal(false);
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleGlobalMouseDown);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("mouseleave", handleGlobalMouseLeave);

    return () => {
      window.removeEventListener("mousedown", handleGlobalMouseDown);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, [isMouseDownGlobal]);

  useEffect(() => {
    let timerId;
    if (timerStarted >= 0 && !isLoading) {
      timerId = setInterval(updateTime, 1000);
    }
    return () => clearInterval(timerId);
  }, [timerStarted, isLoading]);

  const updateTime = () => {
    setTimeToDisplay((prevTime) => prevTime + 1);
  };

  useEffect(() => {
    resetGame();
    ReactGA.event({
      category: "game_restart",
      action: "game_restarted",
      label: "minesweeper",
    });
  }, [restartGame]);

  const resetGame = () => {
    if (restartGame) {
      abortControllerRef.current.abort();
      setGameEnded("MSG_CONTINUE");
      setTimeToDisplay(0);
      setTimerStarted(-1);
      setRestartGame(false);
      start();
      setGameFinished(false);
      setCurrentboard(board);
      setCurrentEstate(estate);
      setRemainingMines(estate?.mineCount);
      setMarkedCount(estate?.markedCount);
      setFirstInteraction(false);
      setIsLoading(false);
      abortControllerRef.current = new AbortController();
    }
  };

  const letsUpdateGameState = async (interaction) => {
    if (gameFinished || isLoading) {
      return;
    }
    setIsLoading(true);
    if (!firstInteraction) {
      setTimerStarted(Date.now());
      setFirstInteraction(true);
    }
    setIsModalOpen(true);
    let loadingTimeout;

    try {
      loadingTimeout = setTimeout(() => {
        setIsDelayedLoading(true);
      }, 300);

      let gameState = { board: currentBoard, engineState: currentEstate };
      let newState = await updateGameState(
        gameState,
        interaction,
        abortControllerRef.current.signal
      );

      if (newState) {
        clearTimeout(loadingTimeout);
        setIsExtendedLoading(false);
        setIsLoading(false);
        setIsDelayedLoading(false);
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
      clearTimeout(loadingTimeout);
      setIsLoading(false);
      setIsDelayedLoading(false);
      console.error("Error updating game state:", error);
      if (error.name !== "AbortError") {
        console.error("Error updating game state:", error);
      }
    }
  };

  return (
    <div className={`${styles["game"]} ${styles["outer-border"]}`}>
      <Loading isLoading={isDelayedLoading} />
      <div className={`${styles["game-status"]} ${styles["inner-border"]}`}>
        <DigitsDisplay digits={3} value={remainingMines - markedCount} />
        <Smiley
          state={
            gameEnded === "MSG_CONGRATULATIONS" ||
            gameEnded === "MSG_THAT_WAS_TOO_EASY"
              ? "win"
              : gameEnded === "MSG_STEPPED_ON_MINE" ||
                gameEnded === "MSG_ILLEGAL_GUESS"
              ? "lose"
              : isMouseDownGlobal && mouseDownOnTile
              ? "scared"
              : "normal"
          }
          onReset={() => setRestartGame(true)}
        />
        <DigitsDisplay digits={3} value={timeToDisplay} />
      </div>
      <div className={styles["inner-border"]}>
        {currentBoard.map((row, y) => (
          <div key={`row-${y}`} className={`${styles["row"]}`}>
            {row.map((tile, x) => (
              <Tile
                coordinates={{ x, y }}
                fieldType={tile}
                gameEnded={gameEnded}
                onMouseDown={(e) => e.button === 0 && setMouseDownOnTile(true)}
                onMouseUp={(e) => e.button === 0 && setMouseDownOnTile(false)}
                onMouseLeave={() => setMouseDownOnTile(false)}
                key={`${y}-${x}`}
                updateState={letsUpdateGameState}
                isLoading={isLoading}
                isMouseDownGlobal={isMouseDownGlobal}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
