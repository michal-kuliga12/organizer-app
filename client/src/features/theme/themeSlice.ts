import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IThemeState {
  value: string;
}
const localStorageKey = "theme";
const persistedTheme = localStorage.getItem(localStorageKey);

const initialState: IThemeState = {
  value: persistedTheme ? persistedTheme : "light"!,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleLight: (state) => {
      return {
        ...state,
        value: "light",
      };
    },
    toggleDark: (state) => {
      return {
        ...state,
        value: "dark",
      };
    },
  },
});
export const selectTheme = (state: RootState) => state.theme.value; // funkcja selektora ma dostęp do store i pozwala nam pozyskać z niego wartość bez konieczności importu. W reduxie nie jest możliwe importowanie store
export const { toggleLight, toggleDark } = themeSlice.actions;
export default themeSlice.reducer;
