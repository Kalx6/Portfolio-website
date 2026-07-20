import { env } from "../config/env.js";

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  const message =
    isOperational || env.NODE_ENV !== "production"
      ? err.message
      : "Something went wrong. Please try again later.";

  if (!isOperational) {
    console.error("UNEXPECTED ERROR 💥", err);
  }

  res.status(statusCode).json({ success: false, message });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}
