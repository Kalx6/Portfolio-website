// src/validators/chat.validator.js

import { z } from "zod";

export const chatSchema = z.object({
  question: z
    .string()
    .trim()
    .min(2, "Question is too short")
    .max(500, "Question is too long — please keep it under 500 characters"),
});
