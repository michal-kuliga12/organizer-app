import React from "react";
import styles from "../styles/Navbar.module.scss";
import {
  selectTheme,
  toggleDark,
  toggleLight,
} from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Navbar: React.FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.navbar}>
      <div>
        <button
          onClick={() => {
            if (theme === "light") {
              localStorage.setItem("theme", "dark");
              return dispatch(toggleDark());
            } else {
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
