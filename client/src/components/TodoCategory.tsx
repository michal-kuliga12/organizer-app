import React from "react";
import styles from "../styles/TodoPage.module.scss";
import TodoItemComp from "./TodoItem";
import { ITodo } from "../interfaces/todo";
const TodoCategory = (props: {
  draggingOver: Function;
  dragEnded: Function;
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
      className={styles.todoList}
    >
      <h2>{props.category}</h2>
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
