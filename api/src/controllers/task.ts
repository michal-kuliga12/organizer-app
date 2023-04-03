import pool from "../db.js";
import { ITodo } from "../interfaces/todo.js";
const dateFormatter = (dateToFormat: Date) => {
  const initialDate = new Date(dateToFormat);
  const formatedDate: string = `${initialDate.getFullYear()}-${
    initialDate.getMonth() + 1
  }-${initialDate.getDate()}`;
  return formatedDate;
};

export const getTasks = async (req: Request, res: Response) => {
  const date = req.params.date;
  console.log(date);
  const formattedDate = dateFormatter(date);
  console.log(formattedDate);
  try {
    const sql = `SELECT * FROM tasks WHERE deadline="${formattedDate}"`;
    console.log(sql);
    await pool.query(sql, (err: Error, results: ITodo[]) => {
      if (err) throw err;
      console.log(results);
      res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (req: Request, res: Response) => {
  console.log(req.body);
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

export const replaceTasks = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
  } catch (error) {
    console.error(error);
  }
};
