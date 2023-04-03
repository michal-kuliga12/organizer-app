import React from "react";
import { ITodo } from "../interfaces/todo";

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
      key={index}
      draggable
      onDragStart={(e) => {
        dragStarted(e, todo?.uid);
      }}
    >
      {todo?.name}
      <button
        onClick={() => {
          deleteTodo(todo?.uid);
        }}
      >
        x
      </button>
      {previousStatus && (
        <button
          onClick={() => {
            todoStatusChange(todo?.uid, previousStatus);
          }}
        >
          {"<"}
        </button>
      )}
      {nextStatus && (
        <button
          onClick={() => {
            todoStatusChange(todo?.uid, nextStatus);
          }}
        >
          {">"}
        </button>
      )}
    </li>
  );
};

export default TodoItemComp;
