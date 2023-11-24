import minesweeperIcon from "./sprites/minesweeper_icon.png";
import segmentheeIcon from "./sprites/segmenthee_icon.png";
import myComputerIcon from "./sprites/my_computer_icon.png";
import { Link, Outlet } from "react-router-dom";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <div className={styles["app"]}>
        <div className={styles["programs"]}>
          <Link to="/minesweeper">
            <div className={styles["program"]}>
              <img
                src={minesweeperIcon}
                alt="Game"
                className={styles["program-icon"]}
              ></img>
              <p className={styles["program-name"]}>Minesweeper</p>
            </div>
          </Link>
          <Link to="https://segmenthee.com/">
            <div className={styles["program"]}>
              <img
                src={segmentheeIcon}
                alt="Game"
                className={styles["program-icon"]}
              ></img>
              <p className={styles["program-name"]}>Segmenthee</p>
            </div>
          </Link>
          <Link to="/about">
            <div className={styles["program"]}>
              <img
                src={myComputerIcon}
                alt="Game"
                className={styles["program-icon"]}
              ></img>
              <p className={styles["program-name"]}>About the game</p>
            </div>
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
