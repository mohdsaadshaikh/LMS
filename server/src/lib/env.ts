import { z } from "zod";

export const Env = z.object({
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  SESSION_COOKIE_NAME: z.string().default("lms.sid"),
  SESSION_SECRET: z.string().min(32),
  SESSION_TTL_SECONDS: z.coerce.number().default(60 * 60 * 24 * 30),
  COOKIE_DOMAIN: z.string().optional(),
  COOKIE_SECURE: z.coerce.boolean().default(true),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});
export const env = Env.parse(process.env);
export const isProd = env.NODE_ENV === "production";
