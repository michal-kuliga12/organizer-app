import React from "react";
import styles from "./Navbar.module.scss";
import {
  selectTheme,
  toggleDark,
  toggleLight,
} from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Navbar: React.FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  console.log(theme);
  return (
    <div className={styles.navbar}>
      <div>
        <button
          onClick={() => {
            if (theme === "light") {
              console.log(theme);
              localStorage.setItem("theme", "dark");
              return dispatch(toggleDark());
            } else {
              console.log(theme);
              localStorage.setItem("theme", "light");
              return dispatch(toggleLight());
            }
          }}
        >
          Toggle theme
        </button>
      </div>
    </div>
  );
};

export default Navbar;
