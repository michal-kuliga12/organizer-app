import express from "express";
import { addTask, getTasks, replaceTasks } from "../controllers/task.js";

const router = express.Router();

router.get("/:date", getTasks);
router.post("/", addTask);
router.put("/", replaceTasks);

export default router;
