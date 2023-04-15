import { useState, useEffect } from "react";
import Todo from "../features/todo/Todo";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import useFetch from "../hooks/useFetch";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { SxProps } from "@mui/material";
import { ITodo } from "../interfaces/todo";
import styles from "../styles/TodoPage.module.scss";
import Info from "../components/Info";
import Toolbar from "../components/Toolbar";
import { useAppSelector } from "../app/hooks";
import themeStyles from "../_theme.scss";
const TodoPage = () => {
  const [newTask, setNewTask] = useState<ITodo>({
    name: "",
    status: "todo",
    created: new Date(),
    deadline: new Date(),
  });
  const theme = useAppSelector(selectTheme);
  const { data, loading, error, reFetch } = useFetch(
    `${import.meta.env.VITE_API_URL}/task/${newTask.deadline}`,
    { date: newTask.deadline },
    "get"
  );
  const popperSx: SxProps = {
    // "&.MuiDateCalendar-root"
    ".MuiPickersDay-root": { borderRadius: "2px" },
    ".Mui-selected": {
      backgroundColor: `${theme == "light" ? "red" : "blue"}`,
    },
    ".css-7oawqu-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
      borderColor: "lightgray",
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <DateCalendar
          className={styles.calendarRoot}
          sx={popperSx}
          onChange={(newValue: any) => {
            setNewTask({ ...newTask, deadline: newValue.$d });
          }}
        />
      </div>
      <Info />
      <Toolbar newTask={newTask} setNewTask={setNewTask} reFetch={reFetch} />
      <Todo
        tasks={data}
        newTask={newTask}
        setNewTask={setNewTask}
        reFetch={reFetch}
      />
    </div>
  );
};

export default TodoPage;
