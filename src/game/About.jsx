import React from "react";
import minesweeperIcon from "../sprites/minesweeper_icon.png";
import wronglyMarked from "../images/wronglymarkedmine.png";
import coveredMulti from "../images/coveredmultifree.png";
import notNecessarily from "../images/notnecessarilymine.png";
import trueMine from "../images/truemine.png";
import phantomMine from "../images/phantommine.png";
import styles from "./Game.module.css";

function AboutPage() {
  return (
    <div style={{ maxWidth: "90vw", display: "flex", flexDirection: "column" }}>
      <img
        src={minesweeperIcon}
        style={{ width: "75px", margin: "auto", display: "block" }}
        alt="Game"
      />

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

        <p style={{ textAlign: "left" }}>Iconography:</p>
        <ul style={{ width: "auto" }}>
          <li className={styles.imageContainer}>
            {" "}
            <div>This field was marked as a mine but it was empty.</div>
            <div>
              <img
                src={wronglyMarked}
                style={{ width: "75px" }}
                alt="Wrongly marked mine"
              />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>This field was marked as a mine but it was empty.</div>
            <div>
              <img
                src={coveredMulti}
                style={{ width: "75px" }}
                alt="Covered multi free"
              />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>This field was marked as a mine but it was empty.</div>
            <div>
              <img
                src={notNecessarily}
                style={{ width: "75px" }}
                alt="Not necessarily mine"
              />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>This field was marked as a mine but it was empty.</div>
            <div>
              <img src={trueMine} style={{ width: "75px" }} alt="True mine" />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>This field was marked as a mine but it was empty.</div>
            <div>
              <img
                src={phantomMine}
                style={{ width: "75px" }}
                alt="Phantom mine"
              />
            </div>
          </li>
        </ul>
        <p>ALL RIGHTS RESERVED SZÖVEG JÖHET IDE</p>
      </div>
    </div>
  );
}

export default AboutPage;
