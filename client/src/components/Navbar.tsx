import React from "react";
import styles from "../styles/Navbar.module.scss";
import {
  selectTheme,
  toggleDark,
  toggleLight,
} from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Switcher from "./Switcher";

const Navbar: React.FC = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  return (
    <header className={styles.navbar}>
      <h3>Organizer</h3>
      <div className={styles.navbarMenu}>
        <nav>
          <ul>
            <li>Organizer</li>
            <li>Plan treningowy</li>
          </ul>
        </nav>
        <Switcher />
      </div>
    </header>
  );
};

export default Navbar;
