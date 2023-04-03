import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import axios from "axios";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { ITask } from "../interfaces/task";
import useFetch from "../hooks/useFetch";
import { Badge } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";

const ToDo: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [getDate, setGetDate] = useState<object | Dayjs | null>(new Date());
  const [newTask, setNewTask] = useState<ITask>({
    name: "",
    deadline: "",
  });
  const [daysToHighlight, setDaysToHighlight] = useState([11]);
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
      reFetch();
    } catch (err) {
      console.error(err);
    }
  };
  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) > 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "🌚" : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }
  return (
    <div className="todo">
      <div className="">
        <div className="dupa"></div>
        <div>
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
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                daysToHighlight,
              } as any,
            }}
          />
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
        </div>
        <div className="activeTasks">
          <ul className="tasks">{/* {data.map((task,index)=>{})} */}</ul>
        </div>
      </div>
      <div>
        <div className="pendingTasks">
          <ul className="tasks">{/* {data.map((task,index)=>{})} */}</ul>
        </div>
        <div className="doneTasks">
          <ul className="tasks">{/* {data.map((task,index)=>{})} */}</ul>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
