import { Router } from "express";
import { pool } from "../lib/database.lib";
import TodosController from "../controllers/todos.controller";
import authMiddleware from "../middlewares/auth.middleware";

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
router.get("/", authMiddleware, todosController.getTodos.bind(todosController));
router.post(
  "/",
  authMiddleware,
  todosController.createTodo.bind(todosController)
);
router.patch(
  "/:id/status",
  authMiddleware,
  todosController.toggleTodoStatus.bind(todosController)
);
router.put(
  "/:id",
  authMiddleware,
  todosController.updateTodo.bind(todosController)
);
router.delete(
  "/:id",
  authMiddleware,
  todosController.deleteTodo.bind(todosController)
);

export default router;
