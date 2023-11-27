import { createHashRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import App from "./App.jsx";
import Window from "./Window.jsx";
import Game from "./game/Game.jsx";
import AboutPage from "./game/About.jsx";
import { startGame } from "./app/api.js";
function Root() {
  const [gameState, setGameState] = useState(null);

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

  const router = createHashRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
          path: "minesweeper",
          element: (
            <Window title="Minesweeper">
              {gameState ? (
                <Game
                  estate={gameState.engineState}
                  board={gameState.board}
                  start={start}
                />
              ) : (
                <div>Loading...</div>
              )}
            </Window>
          ),
        },
        {
          path: "about",
          element: (
            <Window title="About">
              <AboutPage></AboutPage>
            </Window>
          ),
        },
      ],
    },
  ]);

  return (
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Root />);
