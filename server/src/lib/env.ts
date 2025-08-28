import { z } from "zod";

export const Env = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});
export const env = Env.parse(process.env);
export const isProd = env.NODE_ENV === "production";
