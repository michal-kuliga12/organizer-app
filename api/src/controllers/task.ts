import pool from "../db.js";
import { ITodo } from "../interfaces/todo.js";
const dateFormatter = (dateToFormat: Date) => {
  const initialDate = new Date(dateToFormat);
  const formatedDate: string = `${initialDate.getFullYear()}-${
    initialDate.getMonth() + 1
  }-${initialDate.getDate()}`;
  return formatedDate;
};

export const getTasks = async (req, res) => {
  const date = req.params.date;
  const formattedDate = dateFormatter(date);
  try {
    const sql = `SELECT * FROM tasks WHERE deadline="${formattedDate}"`;
    await pool.query(sql, (err: Error, results: ITodo[]) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (req, res) => {
  let { name, status, created, deadline } = req.body;
  const formattedDeadline = dateFormatter(deadline);
  const formattedCreatedAt = dateFormatter(created);
  try {
    const sql = `INSERT INTO tasks(name,status,created_at,deadline) VALUES("${name}","${status}","${formattedCreatedAt}","${formattedDeadline}");`;
    await pool.query(sql, (err: Error, results: ITodo[]) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};

export const editTask = async (req, res) => {
  const data: ITodo | null = req.body;
  const formattedDeadline = dateFormatter(data!.deadline);
  try {
    const sql = `UPDATE tasks SET status="${
      data!.status
    }" WHERE (deadline="${formattedDeadline}" AND id=${data!.id});`;
    await pool.query(sql, (err: Error, results: ITodo[]) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `DELETE FROM tasks WHERE id=${id}`;
    await pool.query(sql, (err: Error, results: ITodo[]) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};
