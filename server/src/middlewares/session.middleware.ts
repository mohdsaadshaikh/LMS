import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { env } from "../lib/env";
import { unsign } from "../utils/crypto";
import { sessionStore } from "../lib/redisStore";

const cookieName = env.SESSION_COOKIE_NAME;

export const sessionMiddleware = async (c: Context, next: Next) => {
  const raw = getCookie(c, cookieName);
  if (!raw) return await next();

  const id = unsign(raw);
  if (!id) return await next();

  const data = await sessionStore.get(id);
  if (!data) return await next();

  (c as any).session = data;
  await sessionStore.touch(id);
  await next();
};
