import { Request, Response } from "express";
import { type Pool } from "mysql2/promise";
import { type TodoQueryResult } from "../types";
import { handleError } from "../utils/response.util";
import { StatusCodes } from "http-status-codes";

class TodosController {
  constructor(private readonly pool: Pool) {}

  async getTodos(req: Request, res: Response) {
    try {
      const sql = "SELECT * FROM `todos` WHERE user_id = ?";

      const [results] = await this.pool.query<TodoQueryResult[]>(sql, [1]); // 회원가입 기능 구현전 임시 user_id 1로 설정

      res.json({
        success: true,
        message: "To-do 목록 조회 성공",
        data: results,
      });
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
        .json({ success: true, message: "To-do 생성 성공" });
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

      await this.pool.query(sql, [id]);

      const [results] = await this.pool.query<TodoQueryResult[]>(
        "SELECT * FROM todos WHERE id = ?",
        [id]
      );

      res.json({
        success: true,
        message: "To-do 상태 변경 성공",
        data: results[0],
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const sql = "UPDATE todos SET title = ? WHERE id = ?";

      await this.pool.query(sql, [title, id]);

      const [results] = await this.pool.query<TodoQueryResult[]>(
        "SELECT * FROM todos WHERE id = ?",
        [id]
      );

      res.json({
        success: true,
        message: "To-do 수정 성공",
        data: results[0],
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const sql = "DELETE FROM todos WHERE id = ?";

      await this.pool.query(sql, [id]);

      res.json({
        success: true,
        message: "To-do 삭제 성공",
        data: { id },
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default TodosController;
