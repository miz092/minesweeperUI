import styles from "./Game.module.css";

const valueToClassName = [
  styles["zero"],
  styles["one"],
  styles["two"],
  styles["three"],
  styles["four"],
  styles["five"],
  styles["six"],
  styles["seven"],
  styles["eight"],
  styles["nine"],
];

function DigitsDisplay({ digits, value }) {
  value = Math.min(Math.pow(10, digits) - 1, Math.max(0, value));
  const digitElements = [];

  for (let i = digits - 1; i >= 0; i--) {
    const digit = Math.floor(value / Math.pow(10, i)) % 10;
    digitElements.push(
      <div
        key={i}
        className={`${styles["digits"]} ${valueToClassName[digit]}`}
      />
    );
  }

  return <div className={styles["digits-display"]}>{digitElements}</div>;
}

export default DigitsDisplay;
