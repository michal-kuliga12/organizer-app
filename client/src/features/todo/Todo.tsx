import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TodoItemComp from "../../components/TodoItem";
import { ITodo } from "../../interfaces/todo";
import styles from "../../styles/TodoPage.module.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useComponentDidMount } from "../../hooks/useComponentDidMount";
import TodoCategory from "../../components/TodoCategory";

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
const Todo = (props: {
  tasks: ITodo[];
  newTask: ITodo;
  setNewTask: React.Dispatch<React.SetStateAction<ITodo>>;
  reFetch: Function;
}) => {
  const [todosData, setTodosData] = useState<ITodo[]>(props.tasks);
  const [todoUpdated, setTodoUpdated] = useState<Boolean>(false);

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

  // ADDING TODO
  const addTodo = async () => {
    const newTodo = new TodoItem(
      props.newTask.name,
      props.newTask.status,
      new Date(),
      props.newTask.deadline
    );
    try {
      await axios.post(`http://localhost:5000/task`, newTodo);
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
  const dragStarted = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    e.dataTransfer.setData("todoId", id);
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
  return (
    <>
      <div className={styles.todo} id={styles.todo1}>
        <TodoCategory
          draggingOver={draggingOver}
          dragEnded={dragEnded}
          category={"todo"}
          todosData={todosData}
          dragStarted={dragStarted}
          deleteTodo={deleteTodo}
          todoStatusChange={todoStatusChange}
          previousStatus={null}
          nextStatus={"inProgress"}
        />
      </div>
      <div className={styles.todo} id={styles.todo2}>
        <TodoCategory
          draggingOver={draggingOver}
          dragEnded={dragEnded}
          category={"inProgress"}
          todosData={todosData}
          dragStarted={dragStarted}
          deleteTodo={deleteTodo}
          todoStatusChange={todoStatusChange}
          previousStatus={"todo"}
          nextStatus={"completed"}
        />
      </div>
      <div className={styles.todo} id={styles.todo3}>
        <TodoCategory
          draggingOver={draggingOver}
          dragEnded={dragEnded}
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
