import { Router, RequestHandler } from "express";
import { pool } from "../lib/database-connect";
import AuthController from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController(pool);

router.post("/register", authController.register.bind(authController));
router.post(
  "/login",
  authController.login.bind(authController) as RequestHandler
);

export default router;
