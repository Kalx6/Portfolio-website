// src/routes/chat.routes.js

import { Router } from "express";
import {
  handleChatMessage,
  handleChatStream,
} from "../controllers/chat.controller.js";
import { chatLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/", chatLimiter, handleChatMessage);
router.post("/stream", chatLimiter, handleChatStream);

export default router;
