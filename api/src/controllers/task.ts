import pool from "../db.js";
import { ITask } from "../interfaces/task.js";
export const getTasks = async (req: Request, res: Response) => {
  try {
    const sql = "SELECT * FROM tasks";
    await pool.query(sql, (err: Error, results: ITask[]) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};

export const addTask = async (req: Request, res: Response) => {
  console.log(req.body);
  let { name, deadline } = req.body;
  console.log(name, deadline);
  try {
    const sql = `INSERT INTO tasks(name,deadline) VALUES('${name}','${deadline}');`;
    await pool.query(sql, (err: Error, results: ITask[]) => {
      if (err) throw err;
      // res.json(results);
    });
  } catch (error) {
    console.error(error);
  }
};
