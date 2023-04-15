import React from "react";
import { ITodo } from "../interfaces/todo";
import styles from "../styles/TodoPage.module.scss";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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
      className={`${styles.todoListItem} ${
        (props.todo.status === "todo" && styles.todo) ||
        (props.todo.status === "inProgress" && styles.inProgress) ||
        (props.todo.status === "completed" && styles.completed)
      }`}
      key={props.index}
      draggable
      onDragStart={(e) => {
        props.dragStarted(e, props.todo?.id, props.todo?.status);
      }}
    >
      <div className={styles.todoListItemUp}>
        <p>{props.todo?.name}</p>
        <button
          className={`${styles.listBtn} ${styles.delBtn}`}
          onClick={() => {
            props.deleteTodo(props.todo?.id);
          }}
        >
          <RxCross2 />
        </button>
      </div>
      <div className={styles.todoListItemDown}>
        {props.previousStatus && (
          <button
            className={`${styles.listBtn} ${styles.leftBtn}`}
            onClick={() => {
              props.todoStatusChange(props.todo?.id, props.previousStatus);
            }}
          >
            <AiOutlineLeft />
          </button>
        )}
        {props.nextStatus && (
          <button
            className={`${styles.listBtn} ${styles.rightBtn}`}
            onClick={() => {
              props.todoStatusChange(props.todo?.id, props.nextStatus);
            }}
          >
            <AiOutlineRight />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItemComp;
