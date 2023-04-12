import React from "react";
import styles from "../styles/TodoPage.module.scss";

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        className={styles.addTaskInput}
        id="task"
        placeholder="Dodaj zadanie..."
      />
      <button className={styles.addTaskBtn}>Dodaj</button>
    </div>
  );
};

export default Toolbar;
