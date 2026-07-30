import { Router } from "express";

const router = Router();

router.get("/user", (req, res) => {
  res.send("user route with get method");
});

export default router;
