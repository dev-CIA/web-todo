import { Request } from "express";
import { ReqUser } from ".";

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}

export {};
