import type { Context, Next } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { env } from "../lib/env";
import { sessionStore } from "../lib/redisStore";
import { unsign } from "../utils/crypto";
import type { Role } from "@prisma/client";
import type { SessionData } from "../lib/types";

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

export const requireRole = (roles: Role) => {
  return async (c: Context, next: Next) => {
    const sess = (c as any).session as SessionData | undefined;
    if (!sess) return c.json({ error: "Not authenticated" }, 401);

    if (!roles.includes(sess.role)) {
      return c.json(
        { error: "You do not have permission to perform this action" },
        403
      );
    }
    await next();
  };
};
