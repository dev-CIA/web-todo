import { Router } from "express";
import { pool } from "../lib/database.lib";
import TodosController from "../controllers/todos.controller";

const router = Router();
const todosController = new TodosController(pool);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: 사용자의 전체 todos을 가져옵니다
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: todos 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/", todosController.getTodos.bind(todosController));
router.post("/", todosController.createTodo.bind(todosController));
router.patch(
  "/:id/status",
  todosController.toggleTodoStatus.bind(todosController)
);
router.put("/:id", todosController.updateTodo.bind(todosController));
router.delete("/:id", todosController.deleteTodo.bind(todosController));

export default router;
