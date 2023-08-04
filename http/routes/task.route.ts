import {Router} from "express";
import jwtAuthMiddleWare from "../middleware/jwtAuthMiddleware";
import TaskController from "../controllers/task.controller";

const router = Router();

router.get("/search", jwtAuthMiddleWare, TaskController.getAllTasks);
router.post("/add", jwtAuthMiddleWare, TaskController.addNewTask);
router.put("/edit", jwtAuthMiddleWare, TaskController.editTask);
router.delete("/delete", jwtAuthMiddleWare, TaskController.deleteTask);

export default router;

