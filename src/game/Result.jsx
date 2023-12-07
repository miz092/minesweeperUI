import minesweeperIcon from "../sprites/minesweeper_icon.png";
import winIcon from "../sprites/win.png";

import explosionIcon from "../sprites/explosion.gif";
import xIcon from "../sprites/xIcon.png";
import styles from "./Game.module.css";
import { useState, useEffect } from "react";

function Result({ gameMessage }) {
  const [messageToShow, setMessageToShow] = useState("");
  const [titleToshow, setTitleToShow] = useState("");
  const [iconToUse, setIconToUse] = useState(null);

  useEffect(() => {
    const updateStateBasedOnMessage = () => {
      switch (gameMessage) {
        case "MSG_STEPPED_ON_MINE":
          setTitleToShow("Game Over");
          setMessageToShow("You have stepped on an actual mine!");
          setIconToUse(explosionIcon);
          break;
        case "MSG_ILLEGAL_GUESS":
          setTitleToShow("Illegal guess!");
          setMessageToShow(
            "That's a bummer. Either you or the automatic assistant has clicked on a field that could have either held a mine or be empty, despite there being other still covered fields that could be deduced to hold no mine and thus could have been played safely. (The automatic assistant does this only if you mislead it by putting a mine mark on a field that does not necessarily hold a mine.) Some fields have now changed their appearance in order to show extra information that could (and should have been) inferred from what you already know; hovering the mouse pointer over those fields gives you further details. It is easiest to think of the guessing rule as follows: as long as you can deduce that at least one covered field is in fact empty and can be stepped on, you aren't allowed to guess. The actual rule is a lot more relaxed than that, but this is a good rule of thumb. On the other hand if you have no choice but to guess, then the engine ensures that you'll have the necessary luck and not hit a mine."
          );
          setIconToUse(xIcon);
          break;
        case "MSG_THAT_WAS_TOO_EASY":
          setTitleToShow("That was too easy!");
          setMessageToShow(
            "As you can see, the automatic assistant accidentally cleared the whole board for you. This will happen occasionally, but never despair, most games require your ingenuity to come into play!"
          );
          setIconToUse(winIcon);
          break;
        case "MSG_CONGRATULATIONS":
          setTitleToShow("Congratulations!");
          setMessageToShow(
            "Congratulations on your victory! You have successfully cleared the board without stepping on a mine!"
          );
          setIconToUse(winIcon);
          break;
        default:
          setMessageToShow("");
          setTitleToShow("");
          setIconToUse(minesweeperIcon);
      }
    };

    updateStateBasedOnMessage();
  }, [gameMessage]);

  return (
    <div className="result">
      <img
        src={iconToUse || minesweeperIcon}
        style={{ width: "55px", margin: "10px auto", display: "block" }}
        alt="Game"
      ></img>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2em",
          margin: "0.5em 0",
        }}
      >
        {titleToshow}
      </h1>
      <p className={styles["scrollbar"]}>{messageToShow}</p>
    </div>
  );
}

export default Result;
