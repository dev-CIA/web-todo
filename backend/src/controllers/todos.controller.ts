import { Request, Response } from "express";
import { type Pool, ResultSetHeader } from "mysql2/promise";
import { type TodoQueryResult } from "../types";
import {
  createSuccessResponse,
  createErrorResponse,
  handleError,
} from "../utils/response.util";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { SUCCESS_MESSAGES } from "../constants/message.constant";

class TodosController {
  constructor(private readonly pool: Pool) {}

  async getTodos(req: Request, res: Response) {
    try {
      const sql = "SELECT * FROM `todos` WHERE user_id = ?";

      const [results] = await this.pool.query<TodoQueryResult[]>(sql, [1]); // 회원가입 기능 구현전 임시 user_id 1로 설정

      res.json(createSuccessResponse(SUCCESS_MESSAGES.TODO_LIST, results));
    } catch (error) {
      handleError(res, error);
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { title } = req.body;

      const sql = "INSERT INTO `todos` (title, user_id) VALUES (?, ?)";

      await this.pool.query(sql, [title, 1]); // 회원가입 기능 구현전 임시 user_id 1로 설정

      res
        .status(StatusCodes.CREATED)
        .json(createSuccessResponse(SUCCESS_MESSAGES.TODO_CREATE));
    } catch (error) {
      handleError(res, error);
    }
  }

  async toggleTodoStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const sql = `
        UPDATE todos 
        SET status = CASE 
          WHEN status = 'not_started' THEN 'completed' 
          ELSE 'not_started' 
        END 
        WHERE id = ?`;

      const [toggleResult] = await this.pool.query<ResultSetHeader>(sql, [id]);

      if (toggleResult.affectedRows === 0) {
        throw new Error(getReasonPhrase(StatusCodes.NOT_FOUND));
      }

      const [todos] = await this.pool.query<TodoQueryResult[]>(
        "SELECT * FROM todos WHERE id = ?",
        [id]
      );

      res.json(createSuccessResponse(SUCCESS_MESSAGES.TODO_STATUS, todos[0]));
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const sql = "UPDATE todos SET title = ? WHERE id = ?";

      const [updateResult] = await this.pool.query<ResultSetHeader>(sql, [
        title,
        id,
      ]);

      if (updateResult.affectedRows === 0) {
        throw new Error(getReasonPhrase(StatusCodes.NOT_FOUND));
      }

      const [todos] = await this.pool.query<TodoQueryResult[]>(
        "SELECT * FROM todos WHERE id = ?",
        [id]
      );

      res.json(createSuccessResponse(SUCCESS_MESSAGES.TODO_EDIT, todos[0]));
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const sql = "DELETE FROM todos WHERE id = ?";

      const [deleteResult] = await this.pool.query<ResultSetHeader>(sql, [id]);

      if (deleteResult.affectedRows === 0) {
        throw new Error(getReasonPhrase(StatusCodes.NOT_FOUND));
      }

      res.json(createSuccessResponse(SUCCESS_MESSAGES.TODO_DELETE, { id }));
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default TodosController;
