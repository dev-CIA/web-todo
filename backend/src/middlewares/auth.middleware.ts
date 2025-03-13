import { type Request, type Response, NextFunction } from "express";
import { type User } from "../types";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { createErrorResponse, handleError } from "../utils/response.util";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(createErrorResponse(StatusCodes.UNAUTHORIZED));

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as User;
    req.user = decoded;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

export default authMiddleware;
