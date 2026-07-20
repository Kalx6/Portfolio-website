import rateLimit from "express-rate-limit";

export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// src/middlewares/rateLimiter.js
// Add this alongside the existing contactFormLimiter in the same file

export const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // more generous than contact form since it's a conversational feature
  message: {
    success: false,
    message: "Too many messages sent. Please wait a bit before continuing.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
