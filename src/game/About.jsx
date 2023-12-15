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
    <div className="about">
      <img
        src={minesweeperIcon}
        style={{ width: "65px", margin: "auto", display: "block" }}
        alt="Game"
      />

      <h1 style={{ textAlign: "center" }}>Justice Minesweeper</h1>
      <div className={styles["innerAbout"]}>
        <p>Experience a new level of challenge with Justice MineSweeper!</p>
        <p>
          Unlike traditional Minesweeper games, where luck plays a role, this
          MineSweeper introduces a unique logic that demands thoughtful
          decision-making at every step. Random guessing won't save you; each
          move requires a deliberate choice, making the game both engaging and
          intellectually stimulating.
        </p>

        <p
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Iconography
        </p>
        <div style={{ maxWidth: "100%" }}>
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
            <div>
              This field is empty but the number on it could not be determined.
              These are the actual fields you must eliminate before you are
              allowed to guess - mere empty fields with a single number on them
              do not stop you from guessing.
            </div>
            <div>
              <img
                src={coveredMulti}
                style={{ width: "75px" }}
                alt="Covered multi free"
              />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>
              This field was marked as a mine and it could have held a mine but
              it could have been empty as well.{" "}
            </div>
            <div>
              <img
                src={notNecessarily}
                style={{ width: "75px" }}
                alt="Not necessarily mine"
              />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>
              This field held a mine and you (or the automatic assistant on your
              behalf) stepped on it.
            </div>
            <div>
              <img src={trueMine} style={{ width: "75px" }} alt="True mine" />
            </div>
          </li>
          <li className={styles.imageContainer}>
            <div>
              You (or the automatic assistant) guessed by stepping on this
              field, but you weren't allowed to guess, so you got mined!
            </div>
            <div>
              <img
                src={phantomMine}
                style={{ width: "75px" }}
                alt="Phantom mine"
              />
            </div>
          </li>
          <div>
            {" "}
            <p
              style={{
                textAlign: "center",
                margin: "1rem",
                padding: "0.3rem",
                lineHeight: "1.5rem",
              }}
            >
              Original Minesweeper concept and implementation (c) 1985 Microsoft
              Corporation
              <br />
              Justice Minesweeper engine concept and implementation (c)
              1999-2023 Zoltán S. Márk
              <br />
              Web UI implementation (c) 2023 Brickz Technologies Hungary Ltd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
