import { Router } from "express";
import { authCallback } from "../controllers/suth.controller.js";
const router = Router();

router.post("/callback", authCallback);

export default router;
