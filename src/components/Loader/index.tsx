import { FC } from "react";

import styles from "./Loader.module.css";

export const Loader: FC = () => (
  <div className={styles.container}>
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
);
