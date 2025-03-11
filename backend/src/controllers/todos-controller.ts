import { Request, Response } from "express";
import { type Pool } from "mysql2/promise";

class TodosController {
  constructor(private readonly pool: Pool) {}

  async getTodos(req: Request, res: Response) {
    try {
      const sql = "SELECT * FROM `todos` WHERE user_id = ?";

      const [rows] = await this.pool.query(sql, [1]); // 회원가입 기능 구현전 임시 user_id 1로 설정

      res.json({ success: true, message: "To-do 목록 조회 성공", data: rows });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);

        res.status(500).json({
          success: false,
          status: 500,
          message: "서버 오류가 발생했습니다.",
          error: "Internal server error",
        });
      }
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const { title } = req.body;

      const sql = "INSERT INTO `todos` (title, user_id) VALUES (?, ?)";

      await this.pool.query(sql, [title, 1]); // 회원가입 기능 구현전 임시 user_id 1로 설정

      res.json({ success: true, message: "To-do 생성 성공" });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);

        res.status(500).json({
          success: false,
          status: 500,
          message: "서버 오류가 발생했습니다.",
          error: "Internal server error",
        });
      }
    }
  }
}

export default TodosController;
