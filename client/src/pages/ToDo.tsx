import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import axios from "axios";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { ITask } from "../interfaces/task";
import useFetch from "../hooks/useFetch";

const ToDo: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [getDate, setGetDate] = useState<object | Dayjs | null>(new Date());
  const [newTask, setNewTask] = useState<ITask>({
    name: "",
    deadline: "",
  });
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/task/${getDate}`,
    { date: getDate },
    "get"
  );
  const addTask = async (task: ITask) => {
    const { name, deadline } = task;
    if (name === "" || deadline === "") return;
    try {
      await axios.post("http://localhost:5000/task", {
        name,
        deadline,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo">
      <form>
        <label htmlFor="task">
          <input
            onChange={(e) => {
              e.preventDefault();
              setNewTask({ ...newTask, name: e.target.value });
            }}
            type="text"
            name="task"
            id="task"
            placeholder="Task..."
          />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            addTask(newTask);
          }}
        >
          add task
        </button>
      </form>
      <DateCalendar
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setNewTask({
            ...newTask,
            deadline: newValue.$d,
          });
          setGetDate(newValue.$d);
          console.log(typeof getDate);
        }}
      />
      <ul className="taskList">
        {data?.map((item) => {
          return (
            <div>
              <h2>{item.name}</h2>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDo;
