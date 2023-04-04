import express from "express";
import {
  addTask,
  getTasks,
  editTask,
  deleteTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/:date", getTasks);
router.post("/", addTask);
router.put("/", editTask);
router.delete("/:id", deleteTask);

export default router;
