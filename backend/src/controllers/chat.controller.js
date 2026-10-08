// src/controllers/chat.controller.js

import { chatSchema } from "../validators/chat.validator.js";
import {
  generateChatResponse,
  streamChatResponse,
} from "../services/chat.service.js";
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

export async function handleChatStream(req, res, next) {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return next(new AppError(parsed.error.issues[0].message, 400));
  }
  const { question } = parsed.data;

  // From here on we stream, so headers go out before the answer exists
  res.status(200).set({
    "Content-Type": "application/x-ndjson; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "X-Accel-Buffering": "no", // asks proxies like nginx not to buffer
  });
  res.flushHeaders();

  // If the visitor closes the tab, stop spending Gemini tokens
  let clientClosed = false;
  res.on("close", () => {
    clientClosed = true;
  });

  const send = (event) => res.write(`${JSON.stringify(event)}\n`);

  try {
    for await (const text of streamChatResponse(question)) {
      if (clientClosed) break;
      send({ type: "chunk", text });
    }
    if (!clientClosed) send({ type: "done" });
  } catch (err) {
    console.error(err); // details stay in the server logs
    if (!clientClosed) {
      send({ type: "error", message: "Sorry, something went wrong." });
    }
  } finally {
    res.end();
  }
}
