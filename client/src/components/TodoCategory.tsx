import React from "react";
import styles from "../styles/TodoPage.module.scss";
import TodoItemComp from "./TodoItem";
import { ITodo } from "../interfaces/todo";
import {
  AiFillClockCircle,
  AiFillCheckCircle,
  AiFillStar,
} from "react-icons/ai";
const TodoCategory = (props: {
  draggingOver: Function;
  dragStartpoint: String;
  dragEnded: Function;
  title: string;
  category: string;
  todosData: ITodo[];
  dragStarted: Function;
  deleteTodo: Function;
  todoStatusChange: Function;
  previousStatus: string | null;
  nextStatus: string | null;
}) => {
  return (
    <ul
      onDragOver={(e) => {
        props.draggingOver(e);
      }}
      onDrop={(e) => {
        props.dragEnded(e, props.category);
      }}
      className={`${styles.todoList} ${
        props.dragStartpoint !== props.category ? `${styles.dropzone}` : ""
      }`}
    >
      <h2>
        {props.title}
        <span>
          {(props.category === "todo" && <AiFillStar />) ||
            (props.category === "inProgress" && <AiFillClockCircle />) ||
            (props.category === "completed" && <AiFillCheckCircle />)}
        </span>
      </h2>
      {props.todosData?.map((todo: ITodo, index: number) => {
        if (todo.status === props.category) {
          return (
            <TodoItemComp
              todo={todo}
              index={index}
              dragStarted={props.dragStarted}
              deleteTodo={props.deleteTodo}
              previousStatus={props.previousStatus}
              nextStatus={props.nextStatus}
              todoStatusChange={props.todoStatusChange}
            />
          );
        }
      })}
    </ul>
  );
};

export default TodoCategory;
