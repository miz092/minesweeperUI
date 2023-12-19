import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import Loading from "./Loading.jsx";
import ReactGA from "react-ga";
import Button from "./Button.jsx";
import loadingGif from "./images/dialup.webp";
import App from "./App.jsx";
import Window from "./Window.jsx";
import Modal from "./Modal.jsx";
import Game from "./game/Game.jsx";
import AboutPage from "./game/About.jsx";
import Result from "./game/Result.jsx";
import { startGame } from "./app/api.js";
function Root() {
  const [gameState, setGameState] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [restartGame, setRestartGame] = useState(false);
  const [gameEnded, setGameEnded] = useState("MSG_CONTINUE");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtendedLoading, setIsExtendedLoading] = useState(false);
  const TRACKING_ID = "G-1EJYGXJ5D3";
  // const TRACKING_ID = "G-RSMM8752NE";
  ReactGA.initialize(TRACKING_ID);
  useEffect(() => {
    let timeoutId;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsExtendedLoading(true);
      }, 3000);
    } else {
      setIsExtendedLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  const orientationRef = useRef(null);
  useEffect(() => {
    orientationRef.current =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";

    startNewGame();
  }, []);

  const handleGameEnd = (message) => {
    setGameFinished(true);
    setGameMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (
      gameMessage === "MSG_CONGRATULATIONS" ||
      gameMessage === "MSG_THAT_WAS_TOO_EASY"
    ) {
      setRestartGame(true);
    }

    setIsModalOpen(false);
    setGameMessage("");
  };

  async function startNewGame() {
    setIsLoading(true);
    try {
      const response = await startGame(orientationRef.current);
      setGameMessage("MSG_CONTINUE");
      setGameState(response);
      setGameFinished(false);
      setIsLoading(false);
      setGameEnded("MSG_CONTINUE");
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  }
  const handleRestartGame = () => {
    setRestartGame(true);
    setIsExtendedLoading(false);
  };
  const gameMessageTitles = {
    MSG_CONGRATULATIONS: "Nice job! You won!",
    MSG_STEPPED_ON_MINE: "Oops! You stepped on a mine!",
    MSG_ILLEGAL_GUESS: "Illegal guess!",
    MSG_THAT_WAS_TOO_EASY: "That was too easy! Try again!",
  };
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App setShowAbout={setShowAbout} />}>
          <Route path="minesweeper" element={<Outlet />}>
            <Route
              index
              element={
                gameState ? (
                  <Window title="Justice Minesweeper">
                    <Game
                      estate={gameState.engineState}
                      board={gameState.board}
                      start={startNewGame}
                      onGameEnd={handleGameEnd}
                      setRestartGame={setRestartGame}
                      restartGame={restartGame}
                      gameEnded={gameEnded}
                      setGameEnded={setGameEnded}
                      gameFinished={gameFinished}
                      setGameFinished={setGameFinished}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      setIsExtendedLoading={setIsExtendedLoading}
                    />
                  </Window>
                ) : (
                  <Loading isLoading={true} />
                )
              }
            />
          </Route>
          <Route
            path="result"
            element={
              <Window title="Result">
                <Result />
              </Window>
            }
          />
        </Route>
      </Routes>
      {isModalOpen && (
        <Modal title={gameMessageTitles[gameMessage]} onClose={closeModal}>
          <Result gameMessage={gameMessage} />
        </Modal>
      )}
      {showAbout && (
        <Modal title="About Minesweeper" onClose={() => setShowAbout(false)}>
          <AboutPage />
        </Modal>
      )}
      {/* {isExtendedLoading && (
        <Modal title="Waiting for response" onClose={closeLoadingModal}>
          <div>
            <img style={{ width: "100%" }} src={loadingGif}></img>
            <p>
              The server takes a bit longer than usual to respond. Please wait.
            </p>
            <div className="buttons">
              <Button onClick={() => closeLoadingModal()} text={"Ok"}></Button>
              <Button
                onClick={() => handleRestartGame()}
                text={"Refresh"}
              ></Button>
            </div>
          </div>
        </Modal>
      )} */}
    </Router>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Root />);
