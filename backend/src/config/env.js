// src/config/env.js
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required"),
  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASS: z.string().min(1),
  EMAIL_TO: z.string().email(),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
