import { useState, useEffect } from "react";
import Todo from "../features/todo/Todo";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import useFetch from "../hooks/useFetch";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { ITodo } from "../interfaces/todo";
import styles from "../styles/TodoPage.module.scss";
const TodoPage = () => {
  const [newTask, setNewTask] = useState<ITodo>({
    name: "",
    status: "todo",
    created: new Date(),
    deadline: new Date(),
  });
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/task/${newTask.deadline}`,
    { date: newTask.deadline },
    "get"
  );
  {
    /* <div className={styles.toolbar}>
        <form>
          <label htmlFor="task_name">
            <input
              onChange={(e) => {
                props.setNewTask({ ...props.newTask, name: e.target.value });
              }}
              placeholder="task_name"
              id="task_name"
              type="text"
            />
          </label>
        </form>
        <button
          onClick={() => {
            addTodo();
          }}
        >
          Dodaj
        </button>
      </div> */
  }
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <DateCalendar
          className={styles.calendarRoot}
          onChange={(newValue: any) => {
            setNewTask({ ...newTask, deadline: newValue.$d });
          }}
        />
      </div>
      <div className={styles.info}>info</div>
      <div className={styles.toolbar}>toolbar</div>
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
