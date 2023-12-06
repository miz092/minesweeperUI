import minesweeperIcon from "../sprites/minesweeper_icon.png";
import wronglyMarked from "../images/wronglymarkedmine.png";
import coveredMulti from "../images/coveredmultifree.png";
import notNecessarily from "../images/notnecessarilymine.png";
import trueMine from "../images/truemine.png";
import phantomMine from "../images/phantommine.png";

import styles from "./Game.module.css";
function AboutPage() {
  return (
    <div style={{ maxWidth: "90vw", display: "block" }}>
      <img
        src={minesweeperIcon}
        style={{ width: "75px", margin: "auto", display: "block" }}
        alt="Game"
      ></img>

      <h1 style={{ textAlign: "center" }}>Justice Minesweeper</h1>
      <div className={styles["about"]}>
        <p>Experience a new level of challenge with Justice MineSweeper!</p>

        <p>
          Unlike traditional Minesweeper games, where luck plays a role, this
          MineSweeper introduces a unique logic that demands thoughtful
          decision-making at every step. Random guessing won't save you; each
          move requires a deliberate choice, making the game both engaging and
          intellectually stimulating.
        </p>

        <p>Technologies used in this project:</p>
        <ul>
          <li>
            {" "}
            <img
              src={wronglyMarked}
              style={{ width: "75px", margin: "auto", display: "block" }}
              alt="wrongly marked mine"
            ></img>
          </li>
          <li>
            {" "}
            <img
              src={coveredMulti}
              style={{ width: "75px", margin: "auto", display: "block" }}
              alt="wrongly marked mine"
            ></img>
          </li>
          <li>
            {" "}
            <img
              src={notNecessarily}
              style={{ width: "75px", margin: "auto", display: "block" }}
              alt="wrongly marked mine"
            ></img>
          </li>
          <li>
            {" "}
            <img
              src={trueMine}
              style={{ width: "75px", margin: "auto", display: "block" }}
              alt="wrongly marked mine"
            ></img>
          </li>
          <li>
            {" "}
            <img
              src={phantomMine}
              style={{ width: "75px", margin: "auto", display: "block" }}
              alt="wrongly marked mine"
            ></img>
          </li>
        </ul>
        <p>ALL RIGHTS RESERVED SZÖVEG JÖHET IDE </p>
      </div>
    </div>
  );
}

export default AboutPage;
