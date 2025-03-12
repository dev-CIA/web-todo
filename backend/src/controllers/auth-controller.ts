import { Request, Response } from "express";
import { type Pool } from "mysql2/promise";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../utils/response";

class AuthController {
  constructor(private readonly pool: Pool) {}

  async register(req: Request, res: Response) {
    try {
      const { userId, password } = req.body;

      const salt = crypto.randomBytes(64).toString("base64");
      const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 100000, 64, "sha512")
        .toString("base64");

      const sql =
        "INSERT INTO `users` (user_id, password, salt) VALUES (?, ?, ?)";

      await this.pool.query(sql, [userId, hashedPassword, salt]);

      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: "회원가입 성공" });
    } catch (error) {
      errorHandler(res, error);
    }
  }
}

export default AuthController;
