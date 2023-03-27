import axios from "axios";
import React, { useEffect, useState } from "react";
import { ITask } from "../interfaces/task";

const ToDo: React.FC = () => {
  const [data, setData] = useState();
  const [task, setTask] = useState<ITask>({
    name: "",
    deadline: "",
  });
  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get("http://localhost:5000/task");
      console.log(response);
      setData(response.data);
    };
    getTasks();
  }, []);
  console.log(task);
  const addTask = async (task: ITask) => {
    const { name, deadline } = task;
    try {
      await axios.post("http://localhost:5000/task", { name, deadline });
      console.log("sent");
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
              setTask({ ...task, name: e.target.value });
            }}
            type="text"
            name="task"
            id="task"
            placeholder="Task..."
          />
        </label>
        <label htmlFor="deadline">
          <input
            onChange={(e) => {
              e.preventDefault();
              setTask({
                ...task,
                deadline: e.target.value,
              });
            }}
            type="date"
            name="deadline"
            id="deadline"
            placeholder="2018-01-01"
          />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            addTask(task);
          }}
        >
          add task
        </button>
      </form>
      <ul className="taskList">
        {data?.map((task) => {
          return <li>{task.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default ToDo;
