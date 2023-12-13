import { Link } from "react-router-dom";
import styles from "./app.module.css";
import Draggable from "react-draggable";

function Window(props) {
  const handleClose = (e) => {
    e.stopPropagation();
  };
  return (
    <Draggable handle={`.${styles.title}`}>
      <div className={styles["window"]}>
        <div className={styles["title"]}>
          {props.title}

          <Link to="/" onClick={handleClose} onTouchStartCapture={handleClose}>
            <div className={styles["close-window-button"]} />
          </Link>
        </div>
        {props.children}
      </div>
    </Draggable>
  );
}

export default Window;
