import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { type Pool } from "mysql2/promise";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import {
  createErrorResponse,
  createSuccessResponse,
  handleError,
} from "../utils/response.util";
import { UserQueryResult } from "../types";
import { SUCCESS_MESSAGES } from "../constants/message.constant";

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
        .json(createSuccessResponse(SUCCESS_MESSAGES.REGISTER));
    } catch (error) {
      handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { userId, password } = req.body;

      const [results] = await this.pool.query<UserQueryResult[]>(
        "SELECT * FROM `users` WHERE user_id = ?",
        [userId]
      );

      const user = results ? results[0] : null;

      const hashedPassword = crypto
        .pbkdf2Sync(password, user?.salt, 100000, 64, "sha512")
        .toString("base64");

      if (user && user.password === hashedPassword) {
        const token = jwt.sign(
          { userId: user.userId, id: user.id },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true });

        res.json({ success: true, message: "로그인 성공" });
      }

      if (!user || user.password !== hashedPassword) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(createErrorResponse(StatusCodes.UNAUTHORIZED));
      }
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default AuthController;
