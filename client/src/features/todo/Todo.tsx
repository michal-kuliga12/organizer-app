import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItemComp from "../../components/TodoItem";
import { ITodo } from "../../interfaces/todo";
import styles from "./Todo.module.scss";

class TodoItem {
  todo_uid: string;
  todo_name: string;
  todo_status: string;
  todo_created: Date;
  todo_deadline: Date;
  constructor(
    id: string,
    name: string,
    status: string,
    deadline: Date,
    createdAt: Date
  ) {
    this.todo_uid = id;
    this.todo_name = name;
    this.todo_status = status;
    this.todo_created = deadline;
    this.todo_deadline = createdAt;
  }
}
const Todo = () => {
  const [todosData, setTodosData] = useState<ITodo[]>([]);
  // TEMPORARY CREATING TODO
  const addTodo = () => {
    const newTodo = new TodoItem(
      uuidv4(),
      "Do przenoszenia",
      "todo",
      new Date("2023-04-12"),
      new Date()
    );
    if (todosData?.length > 0) {
      setTodosData([...todosData, newTodo]);
      return;
    }
    return setTodosData([newTodo]);
  };
  // DELETING TODO BY ID
  const deleteTodo = (uid: string) => {
    const tempTodoData = todosData.filter((todo) => todo.todo_uid !== uid);
    setTodosData([...tempTodoData]);
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
    const transferedTodoUID = e.dataTransfer.getData("TodoId");
    todoStatusChange(transferedTodoUID, newStatus);
  };
  const todoStatusChange = (uid: string, newStatus: string) => {
    const todoIndex = todosData!.findIndex((todo) => todo.todo_uid === uid);
    let foundTodo = todosData!.filter((todo) => todo.todo_uid === uid);
    foundTodo[0]!.todo_status = newStatus;
    let tempTodoData: ITodo[] = todosData;
    tempTodoData[todoIndex] = foundTodo[0];
    setTodosData([...tempTodoData]);
  };
  // const upKeyChange = (e,index) => {}
  // const downKeyChange = (e,index) => {}
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
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
            if (todo.todo_status === "todo") {
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
            if (todo.todo_status === "inProgress") {
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
            if (todo.todo_status === "completed") {
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
