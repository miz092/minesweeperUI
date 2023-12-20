import minesweeperIcon from "./sprites/minesweeper_icon.png";
import segmentheeIcon from "./sprites/segmenthee_icon.png";
import myComputerIcon from "./sprites/my_computer_icon.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import { useEffect } from "react";
import ReactGA from "react-ga";
const TRACKING_ID = "G-1EJYGXJ5D3";
// const TRACKING_ID = "G-RSMM8752NE";

function App({ setShowAbout }) {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);
  let location = useLocation();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location]);
  const handleAboutClick = () => {
    setShowAbout(true);
  };

  return (
    <>
      <div className={styles["app"]}>
        <div className={styles["programs"]}>
          <Link
            to="/minesweeper"
            onClick={() =>
              ReactGA.event({
                category: "play_click",
                action: "clicked_on_play_game",
                label: "minesweeper",
              })
            }
          >
            <div className={styles["program"]}>
              <img
                src={minesweeperIcon}
                alt="Game"
                className={styles["program-icon"]}
              />
              <p className={styles["program-name"]}>Justice Minesweeper</p>
            </div>
          </Link>
          <a
            href="https://segmenthee.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              ReactGA.event({
                category: "segmenthee_click",
                action: "clicked_on_segmenthee",
                label: "segmenthee",
              })
            }
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
