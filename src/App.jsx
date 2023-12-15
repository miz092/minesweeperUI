import minesweeperIcon from "./sprites/minesweeper_icon.png";
import segmentheeIcon from "./sprites/segmenthee_icon.png";
import myComputerIcon from "./sprites/my_computer_icon.png";
import { Link, Outlet } from "react-router-dom";
import styles from "./app.module.css";

function App({ setShowAbout }) {
  const handleAboutClick = () => {
    setShowAbout(true);
  };

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
              />
              <p className={styles["program-name"]}>Minesweeper</p>
            </div>
          </Link>
          <a
            href="https://segmenthee.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles["program"]}>
              <img
                src={segmentheeIcon}
                alt="Segmenthee"
                className={styles["program-icon"]}
              />
              <p className={styles["program-name"]}>Segmenthee</p>
            </div>
          </a>
          {/* <Link to="/minesweeper/about"> */}
          <div onClick={handleAboutClick} className={styles["program"]}>
            <img
              src={myComputerIcon}
              alt="About the Game"
              className={styles["program-icon"]}
            />
            <p className={styles["program-name"]}>About the Game</p>
          </div>
          {/* </Link> */}
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
