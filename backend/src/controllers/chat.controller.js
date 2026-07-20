// src/controllers/chat.controller.js

import { chatSchema } from "../validators/chat.validator.js";
import { generateChatResponse } from "../services/chat.service.js";
import { AppError } from "../utils/AppError.js";

export async function handleChatMessage(req, res, next) {
  try {
    const parsed = chatSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError(parsed.error.issues[0].message, 400);
    }

    const { question } = parsed.data;
    const answer = await generateChatResponse(question);

    res.status(200).json({
      success: true,
      data: { answer },
    });
  } catch (err) {
    next(err);
  }
}
