import React from "react";
import { ITodo } from "../interfaces/todo";
import styles from "../styles/TodoPage.module.scss";

interface ITodoItemComp {
  todo: ITodo;
  index: number;
  dragStarted: Function;
  deleteTodo: Function;
  previousStatus: string | null;
  nextStatus: string | null;
  todoStatusChange: Function;
}
const TodoItemComp = ({
  todo,
  index,
  dragStarted,
  deleteTodo,
  previousStatus,
  nextStatus,
  todoStatusChange,
}: ITodoItemComp) => {
  return (
    <li
      className={styles.todoListItem}
      key={index}
      draggable
      onDragStart={(e) => {
        dragStarted(e, todo?.id);
      }}
    >
      {todo?.name}
      <button
        onClick={() => {
          deleteTodo(todo?.id);
        }}
      >
        x
      </button>
      {previousStatus && (
        <button
          onClick={() => {
            todoStatusChange(todo?.id, previousStatus);
          }}
        >
          {"<"}
        </button>
      )}
      {nextStatus && (
        <button
          onClick={() => {
            todoStatusChange(todo?.id, nextStatus);
          }}
        >
          {">"}
        </button>
      )}
    </li>
  );
};

export default TodoItemComp;
