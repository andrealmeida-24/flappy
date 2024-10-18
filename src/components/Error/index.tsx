import { FC } from "react";

import errorIcon from "../../assets/errorIcon.png";
import styles from "./Error.module.css";

export const Error: FC = () => {
  return (
    <div className={styles.container}>
      <img src={errorIcon} alt="error" />
      <p>To play the game, please rotate your device.</p>
    </div>
  );
};
