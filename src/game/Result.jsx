import minesweeperIcon from "../sprites/minesweeper_icon.png";

function Result() {
  return (
    <div style={{ maxWidth: "300px" }}>
      <img
        src={minesweeperIcon}
        style={{ width: "64px", margin: "auto", display: "block" }}
        alt="Game"
      ></img>
      <h1 style={{ textAlign: "center" }}>Strategic Minesweeper</h1>
      <p>Experience a new level of challenge with Strategic MineSweeper!</p>
    </div>
  );
}

export default Result;
