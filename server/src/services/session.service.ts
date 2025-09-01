import { randomBytes } from "crypto";
import type { Context } from "hono";
import type { SessionData } from "../lib/types";
import { sessionStore } from "../lib/redisStore";
import { setCookie } from "hono/cookie";
import { env } from "../lib/env";
import { sign } from "../utils/crypto";
import type { Role } from "@prisma/client";

const cookieName = env.SESSION_COOKIE_NAME;

export const createSession = async (userId: string, role: Role, c: Context) => {
  const sessionId = randomBytes(32).toString("hex");
  const now = Date.now();

  const data: SessionData = {
    userId,
    createdAt: now,
    sessionId,
    role,
    lastActive: now,
  };

  await sessionStore.set(sessionId, data);

  setCookie(c, cookieName, sign(sessionId), {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    path: "/",
    sameSite: "Strict",
    domain: env.COOKIE_DOMAIN,
    maxAge: env.SESSION_TTL_SECONDS,
  });
};
