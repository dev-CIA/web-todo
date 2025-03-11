import { Router } from "express";
import { pool } from "../lib/database-connect";
import TodosController from "../controllers/todos-controller";

const router = Router();
const todosController = new TodosController(pool);

router.get("/", todosController.getTodos.bind(todosController));
router.post("/", todosController.createTodo.bind(todosController));

export default router;
