import express from "express";
import { addTask, getTasks } from "../controllers/task.js";

const router = express.Router();

router.get("/:date", getTasks);
router.post("/", addTask);

export default router;
