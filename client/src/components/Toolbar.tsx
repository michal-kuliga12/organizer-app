import React from "react";
import styles from "../styles/TodoPage.module.scss";
import axios from "axios";
import { ITodo } from "../interfaces/todo";

class TodoItem implements ITodo {
  name: string;
  status: string;
  created: Date;
  deadline: Date;
  constructor(name: string, status: string, deadline: Date, createdAt: Date) {
    this.name = name;
    this.status = status;
    this.created = deadline;
    this.deadline = createdAt;
  }
}

const Toolbar = (props: {
  newTask: ITodo;
  setNewTask: React.Dispatch<React.SetStateAction<ITodo>>;
  reFetch: Function;
}) => {
  // ADDING TODO
  const addTodo = async () => {
    const newTodo = new TodoItem(
      props.newTask.name,
      props.newTask.status,
      new Date(),
      props.newTask.deadline
    );
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/task`, newTodo);
      props.reFetch();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.toolbar}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <label htmlFor="taskName"></label>
        <input
          type="text"
          className={styles.addTaskInput}
          id="task"
          onChange={(e) => {
            props.setNewTask({ ...props.newTask, name: e.target.value });
          }}
          placeholder="Dodaj zadanie..."
          required
          maxLength={32}
          minLength={1}
        />
        <button className={styles.addTaskBtn}>Dodaj</button>
      </form>
    </div>
  );
};

export default Toolbar;
