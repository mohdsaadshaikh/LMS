import type { Context, Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { env } from "../lib/env";
import { unsign } from "../utils/crypto";
import { sessionStore } from "../lib/redisStore";
import { id } from "zod/locales";

const cookieName = env.SESSION_COOKIE_NAME;

export const sessionMiddleware = async (c: Context, next: Next) => {
  const signedSessionCookie = getCookie(c, cookieName);
  if (!signedSessionCookie) return await next();

  const id = unsign(signedSessionCookie);
  if (!id) return await next();

  const data = await sessionStore.get(id);
  if (!data) {
    setCookie(c, cookieName, "", { maxAge: 0, path: "/" });
    return await next();
  }

  (c as any).session = data;
  await sessionStore.touch(id);
  await next();
};
