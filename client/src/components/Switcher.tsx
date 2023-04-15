import React from "react";
import styles from "../styles/Switcher.module.scss";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectTheme,
  toggleDark,
  toggleLight,
} from "../features/theme/themeSlice";

const Switcher = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const themeSwitch = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      return dispatch(toggleDark());
    } else {
      localStorage.setItem("theme", "light");
      return dispatch(toggleLight());
    }
  };
  return (
    <button
      onClick={() => {
        themeSwitch();
      }}
      className={`${styles.switcher} ${
        theme === "light" ? styles.light : styles.dark
      }`}
    >
      <span className={styles.icon} id={styles.moon}>
        <BsMoonStarsFill />
      </span>
      <span className={styles.icon} id={styles.sun}>
        <BsFillSunFill />
      </span>
      <span className={styles.marker}></span>
    </button>
  );
};

export default Switcher;
