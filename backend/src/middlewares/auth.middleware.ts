import { type Request, type Response, type NextFunction } from "express";
import { type ReqUser } from "../types";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/response.util";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) throw new Error(getReasonPhrase(StatusCodes.UNAUTHORIZED));

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as ReqUser;
    req.user = decoded;

    next();
  } catch (error) {
    handleError(res, error);
  }
};

export default authMiddleware;
