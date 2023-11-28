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
      <p>
        Unlike traditional Minesweeper games, where luck plays a role, this
        MineSweeper introduces a unique logic that demands thoughtful
        decision-making at every step. Random guessing won't save you; each move
        requires a deliberate choice, making the game both engaging and
        intellectually stimulating.
      </p>

      <p>Technologies used in this project:</p>
      <ul>
        <li>Magic</li>
        <li>More magic</li>
        <li>Imagination</li>
        <li>Determination</li>
        <li>Brain</li>
      </ul>
      <p>ALL RIGHTS RESERVED SZÖVEG JÖHET IDE </p>
    </div>
  );
}

export default Result;
