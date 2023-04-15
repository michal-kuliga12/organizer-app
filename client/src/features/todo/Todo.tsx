import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TodoItemComp from "../../components/TodoItem";
import { ITodo } from "../../interfaces/todo";
import styles from "../../styles/TodoPage.module.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useComponentDidMount } from "../../hooks/useComponentDidMount";
import TodoCategory from "../../components/TodoCategory";
import { AiFillClockCircle } from "react-icons/ai";

const Todo = (props: {
  tasks: ITodo[];
  newTask: ITodo;
  setNewTask: React.Dispatch<React.SetStateAction<ITodo>>;
  reFetch: Function;
}) => {
  const [todosData, setTodosData] = useState<ITodo[]>(props.tasks);
  const [todoUpdated, setTodoUpdated] = useState<Boolean>(false);
  const [dragStartpoint, setDragStartpoint] = useState<String>("");

  const isComponentMounted = useComponentDidMount();
  const todoRef = useRef<ITodo>();
  // Value change on date selection
  useEffect(() => {
    if (isComponentMounted) {
      setTodosData(props.tasks);
    }
  }, [props.tasks]);
  // Value change on editing todo
  useEffect(() => {
    if (todoUpdated && isComponentMounted) {
      editTodos(todoRef.current);
      setTodoUpdated(false);
    }
  }, [todosData]);

  const editTodos = async (body: ITodo | undefined) => {
    try {
      await axios.put(`http://localhost:5000/task`, body);
      props.reFetch();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETING TODO BY ID
  const deleteTodo = async (id: string) => {
    const todoToDelete = todosData.filter(
      (todo) => Number(todo.id) === Number(id)
    );
    const body = todoToDelete[0];
    try {
      await axios.delete(`http://localhost:5000/task/${body.id}`);
      props.reFetch();
    } catch (error) {
      console.error(error);
    }
    // setTodosData([...tempTodoData]);
  };
  // DRAGGING START
  const dragStarted = (
    e: React.DragEvent<HTMLLIElement>,
    id: string,
    status: string
  ) => {
    e.dataTransfer.setData("todoId", id);
    setDragStartpoint(status);
    console.log(status);
  };
  // DRAGGING OVER
  const draggingOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
  };
  // DRAGGING END
  const dragEnded = (
    e: React.DragEvent<HTMLUListElement>,
    newStatus: string
  ) => {
    const transferedTodoid = e.dataTransfer.getData("todoId");
    todoStatusChange(transferedTodoid, newStatus);
    setDragStartpoint(newStatus);
  };
  const todoStatusChange = (id: string, newStatus: string) => {
    const todoIndex = todosData.findIndex(
      (todo) => Number(todo.id) === Number(id)
    );
    let foundTodo = todosData.filter((todo) => Number(todo.id) === Number(id));
    foundTodo[0].status = newStatus;
    todoRef.current = foundTodo[0];
    let tempTodoData: ITodo[] = todosData;
    tempTodoData[todoIndex] = foundTodo[0];
    setTodosData([...tempTodoData]);
    setTodoUpdated(true);
  };

  const addDropZoneOverlay = (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains(`${styles.dropzone}`)) {
      e.target.classList.add(`${styles.dragover}`);
    }
  };
  const removeDropZoneOverlay = (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains(`${styles.dropzone}`)) {
      e.target.classList.remove(`${styles.dragover}`);
    }
  };
  return (
    <>
      <div
        className={`${styles.todo}`}
        id={styles.todo1}
        onDragEnter={(e) => {
          addDropZoneOverlay(e);
        }}
        onDragLeave={(e) => {
          removeDropZoneOverlay(e);
        }}
      >
        <TodoCategory
          draggingOver={draggingOver}
          dragStartpoint={dragStartpoint}
          dragEnded={dragEnded}
          title={"Do zrobienia"}
          category={"todo"}
          todosData={todosData}
          dragStarted={dragStarted}
          deleteTodo={deleteTodo}
          todoStatusChange={todoStatusChange}
          previousStatus={null}
          nextStatus={"inProgress"}
        />
      </div>
      <div
        className={`${styles.todo}`}
        id={styles.todo2}
        onDragEnter={(e) => {
          addDropZoneOverlay(e);
        }}
        onDragLeave={(e) => {
          removeDropZoneOverlay(e);
        }}
      >
        <TodoCategory
          draggingOver={draggingOver}
          dragStartpoint={dragStartpoint}
          dragEnded={dragEnded}
          title={"Oczekiwane"}
          category={"inProgress"}
          todosData={todosData}
          dragStarted={dragStarted}
          deleteTodo={deleteTodo}
          todoStatusChange={todoStatusChange}
          previousStatus={"todo"}
          nextStatus={"completed"}
        />
      </div>
      <div
        className={`${styles.todo}`}
        id={styles.todo3}
        onDragEnter={(e) => {
          addDropZoneOverlay(e);
        }}
        onDragLeave={(e) => {
          removeDropZoneOverlay(e);
        }}
      >
        <TodoCategory
          draggingOver={draggingOver}
          dragStartpoint={dragStartpoint}
          dragEnded={dragEnded}
          title={"Ukończone"}
          category={"completed"}
          todosData={todosData}
          dragStarted={dragStarted}
          deleteTodo={deleteTodo}
          todoStatusChange={todoStatusChange}
          previousStatus={"inProgress"}
          nextStatus={null}
        />
      </div>
    </>
  );
};

export default Todo;
