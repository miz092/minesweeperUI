import minesweeperIcon from "../sprites/minesweeper_icon.png";

function Result({ gameMessage }) {
  return (
    <div style={{ maxWidth: "300px" }}>
      <img
        src={minesweeperIcon}
        style={{ width: "64px", margin: "auto", display: "block" }}
        alt="Game"
      ></img>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          margin: "0.5em 0",
        }}
      >
        {gameMessage}
      </h1>
      <p>{gameMessage}</p>
    </div>
  );
}

export default Result;
