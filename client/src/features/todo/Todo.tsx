import React, { useEffect, useState } from "react";
import TodoItemComp from "../../components/TodoItem";
import { ITodo } from "../../interfaces/todo";
import styles from "./Todo.module.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ITask } from "../../interfaces/task";

class TodoItem {
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
const Todo = ({ tasks, newTask, setNewTask }) => {
  const [todosData, setTodosData] = useState<ITask[]>(tasks);
  useEffect(() => {
    setTodosData(tasks);
  }, [tasks]);
  console.log(todosData);
  const postTodo = async (body) => {
    try {
      await axios.post(`http://localhost:5000/task`, body);
    } catch (error) {
      console.error(error);
    }
  };
  // TEMPORARY CREATING TODO
  const addTodo = () => {
    const newTodo = new TodoItem(
      newTask.name,
      newTask.status,
      new Date(),
      newTask.deadline
    );
    console.log(newTodo);
    if (todosData?.length > 0) {
      setTodosData([...todosData, newTodo]);
      postTodo(newTodo);
      return;
    }
    return setTodosData([newTodo]);
  };
  // DELETING TODO BY ID
  const deleteTodo = (id: string) => {
    const tempTodoData = todosData.filter((todo) => todo.id !== id);
    setTodosData([...tempTodoData]);
  };
  // DRAGGING START
  const dragStarted = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    console.log(id);
    e.dataTransfer.setData("todoid", id);
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
    const transferedTodoid = e.dataTransfer.getData("Todoid");
    todoStatusChange(transferedTodoid, newStatus);
  };
  const todoStatusChange = (id: string, newStatus: string) => {
    const todoIndex = todosData!.findIndex((todo) => todo.id === id);
    let foundTodo = todosData!.filter((todo) => todo.id === id);
    foundTodo[0]!.status = newStatus;
    let tempTodoData: ITodo[] = todosData;
    tempTodoData[todoIndex] = foundTodo[0];
    setTodosData([...tempTodoData]);
  };
  // const upKeyChange = (e,index) => {}
  // const downKeyChange = (e,index) => {}
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <form>
          <label for="task_name">
            <input
              onChange={(e) => {
                setNewTask({ ...newTask, name: e.target.value });
                console.log(newTask.name);
              }}
              placeholder="task_name"
              id="task_name"
              type="text"
            />
          </label>
        </form>
        <button
          onClick={() => {
            addTodo();
          }}
        >
          Dodaj
        </button>
      </div>
      <div className={styles.todos}>
        <ul
          onDragOver={(e) => {
            draggingOver(e);
          }}
          onDrop={(e) => {
            dragEnded(e, "todo");
          }}
          className={styles.todo}
        >
          <h2>todo</h2>
          {todosData?.map((todo, index) => {
            if (todo.status === "todo") {
              return (
                <TodoItemComp
                  todo={todo}
                  index={index}
                  dragStarted={dragStarted}
                  deleteTodo={deleteTodo}
                  previousStatus={null}
                  nextStatus={"inProgress"}
                  todoStatusChange={todoStatusChange}
                />
              );
            }
          })}
        </ul>
        <ul
          onDragOver={(e) => {
            draggingOver(e);
          }}
          onDrop={(e) => {
            dragEnded(e, "inProgress");
          }}
          className={styles.inProgress}
        >
          <h2>inProgress</h2>
          {todosData?.map((todo, index) => {
            if (todo.status === "inProgress") {
              return (
                <TodoItemComp
                  todo={todo}
                  index={index}
                  dragStarted={dragStarted}
                  deleteTodo={deleteTodo}
                  previousStatus={"todo"}
                  nextStatus={"completed"}
                  todoStatusChange={todoStatusChange}
                />
              );
            }
          })}
        </ul>
        <ul
          onDragOver={(e) => {
            draggingOver(e);
          }}
          onDrop={(e) => {
            dragEnded(e, "completed");
          }}
          className={styles.completed}
        >
          <h2>completed</h2>
          {todosData?.map((todo, index) => {
            if (todo.status === "completed") {
              return (
                <TodoItemComp
                  todo={todo}
                  index={index}
                  dragStarted={dragStarted}
                  deleteTodo={deleteTodo}
                  previousStatus={"inProgress"}
                  nextStatus={null}
                  todoStatusChange={todoStatusChange}
                />
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
