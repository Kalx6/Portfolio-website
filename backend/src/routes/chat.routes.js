// src/routes/chat.routes.js

import { Router } from "express";
import { handleChatMessage } from "../controllers/chat.controller.js";
import { chatLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/", chatLimiter, handleChatMessage);

export default router;
