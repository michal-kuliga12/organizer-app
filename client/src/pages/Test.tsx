import React from "react";
import Todo from "../features/todo/Todo";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";

const Test = () => {
  const localTheme = localStorage.getItem("theme");
  console.log(typeof localTheme);
  return (
    <div>
      <h1>Test</h1>
      <Todo />
    </div>
  );
};

export default Test;
