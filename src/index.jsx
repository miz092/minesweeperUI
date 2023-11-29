import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import App from "./App.jsx";
import Window from "./Window.jsx";
import Modal from "./Modal.jsx";
import Result from "./game/Result.jsx";
import Game from "./game/Game.jsx";
import AboutPage from "./game/About.jsx";
import { startGame } from "./app/api.js";

function Root() {
  const [gameState, setGameState] = useState(null);

  const [gameEnded, setGameEnded] = useState(null);
  const [gameMessage, setGameMessage] = useState("");

  const handleGameEnd = (message) => {
    setGameEnded(true);
    setGameMessage(message);
  };
  const closeModal = () => {
    setGameEnded(null);
    setGameMessage("");
  };
  async function start() {
    try {
      const response = await startGame();
      setGameState(response);
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  }

  useEffect(() => {
    start();
  }, []);

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
                    estate={gameState.engineState}
                    board={gameState.board}
                    start={start}
                    onGameEnd={handleGameEnd}
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
        </Route>
      </Routes>
      {gameEnded && (
        <Modal
          title={gameEnded === "win" ? "Congratulations" : "Game Over"}
          onClose={closeModal}
        >
          <Result gameMessage={gameMessage} />
        </Modal>
      )}
    </Router>
  );
}

const container = document.getElementById("root");

// Check if the container already has a root instance
if (!container._reactRootContainer) {
  const root = createRoot(container);
  root.render(<Root />);
} else {
  // If there's already a root instance, update it
  container._reactRootContainer.render(<Root />);
}
