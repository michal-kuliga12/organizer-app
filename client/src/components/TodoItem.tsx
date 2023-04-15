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
const TodoItemComp = (props: {
  todo: ITodo;
  index: number;
  dragStarted: Function;
  deleteTodo: Function;
  previousStatus: string | null;
  nextStatus: string | null;
  todoStatusChange: Function;
}) => {
  return (
    <li
      className={styles.todoListItem}
      key={props.index}
      draggable
      onDragStart={(e) => {
        props.dragStarted(e, props.todo?.id, props.todo?.status);
      }}
    >
      {props.todo?.name}
      <button
        onClick={() => {
          console.log(props.todo?.id);
          props.deleteTodo(props.todo?.id);
        }}
      >
        x
      </button>
      {props.previousStatus && (
        <button
          onClick={() => {
            props.todoStatusChange(props.todo?.id, props.previousStatus);
          }}
        >
          {"<"}
        </button>
      )}
      {props.nextStatus && (
        <button
          onClick={() => {
            props.todoStatusChange(props.todo?.id, props.nextStatus);
          }}
        >
          {">"}
        </button>
      )}
    </li>
  );
};

export default TodoItemComp;
