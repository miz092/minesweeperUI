import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect, useRef } from "react";
import App from "./App.jsx";
import Window from "./Window.jsx";
import Modal from "./Modal.jsx";
import Game from "./game/Game.jsx";
import AboutPage from "./game/About.jsx";
import Result from "./game/Result.jsx";
import { startGame } from "./app/api.js";

function Root() {
  const [gameState, setGameState] = useState(null);
  const [gameFinished, setGameFinished] = useState(false); // Initialize as false
  const [gameMessage, setGameMessage] = useState("");
  const [restartGame, setRestartGame] = useState(false);
  const [gameEnded, setGameEnded] = useState("MSG_CONTINUE");
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility

  const orientationRef = useRef(null);
  useEffect(() => {
    orientationRef.current =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  }, []);

  const handleGameEnd = (message) => {
    setGameFinished(true);
    setGameMessage(message);
    setIsModalOpen(true);
  };
  useEffect(() => {
    start();
  }, []);
  const closeModal = () => {
    if (
      gameMessage === "MSG_CONGRATULATIONS" ||
      gameMessage === "MSG_THAT_WAS_TOO_EASY"
    ) {
      setRestartGame(true);
    }
    setIsModalOpen(false); // Reset to false when the modal is closed

    setGameMessage("");
  };

  async function start() {
    try {
      const response = await startGame(orientationRef.current);
      setGameState(response);
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            path="/minesweeper"
            element={
              <Window title="Minesweeper">
                {gameState ? (
                  <Game
                    onclick={() => setRestartGame(true)}
                    estate={gameState.engineState}
                    board={gameState.board}
                    start={start}
                    onGameEnd={handleGameEnd}
                    setRestartGame={setRestartGame}
                    restartGame={restartGame}
                    gameEnded={gameEnded}
                    setGameEnded={setGameEnded}
                    gameFinished={gameFinished}
                    setGameFinished={setGameFinished}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </Window>
            }
          />
          <Route
            path="about"
            element={
              <Window title="About">
                <AboutPage></AboutPage>
              </Window>
            }
          />
          <Route
            path="result"
            element={
              <Window title="Result">
                <Result></Result>
              </Window>
            }
          />
        </Route>
      </Routes>
      {isModalOpen && (
        <Modal
          title={gameFinished === "win" ? "Congratulations" : "Game Over"}
          onClose={closeModal}
        >
          <Result gameMessage={gameMessage} />
        </Modal>
      )}
    </Router>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Root />);
