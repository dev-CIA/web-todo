import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("TODOS API");
});

export default router;
