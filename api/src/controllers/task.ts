import pool from "../db.js";
import { ITask } from "../interfaces/task.js";
const dateFormatter = (dateToFormat) => {
  const initialDate = new Date(dateToFormat);
  const formatedDate: string = `${initialDate.getFullYear()}-0${
    initialDate.getMonth() + 1
  }-${initialDate.getDate()}`;
  return formatedDate;
};

export const getTasks = async (req: Request, res: Response) => {
  const date = req.params.date;
  const formattedDate = dateFormatter(date);
  console.log(date);
  try {
    const sql = `SELECT * FROM tasks WHERE deadline='${formattedDate}'`;
    await pool.query(sql, (err: Error, results: ITask[]) => {
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
  let { name, deadline } = req.body;
  const formattedDeadline = dateFormatter(deadline);
  try {
    const sql = `INSERT INTO tasks(name,deadline) VALUES('${name}','${formattedDeadline}');`;
    await pool.query(sql, (err: Error, results: ITask[]) => {
      if (err) throw err;
      // res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};
