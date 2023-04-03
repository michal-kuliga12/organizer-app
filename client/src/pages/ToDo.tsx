import { useState, useEffect } from "react";
import Todo from "../features/todo/Todo";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/theme/themeSlice";
import useFetch from "../hooks/useFetch";
import { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { ITodo } from "../interfaces/todo";

const Test = () => {
  const [newTask, setNewTask] = useState<ITodo>({
    name: null,
    status: "todo",
    created: new Date(),
    deadline: new Date(),
  });
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/task/${newTask.deadline}`,
    { date: newTask.deadline },
    "get"
  );
  return (
    <div>
      <h1>Test</h1>
      <DateCalendar
        onChange={(newValue) => {
          setNewTask({ ...newTask, deadline: newValue.$d });
        }}
      />
      <Todo tasks={data} newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
};

export default Test;
