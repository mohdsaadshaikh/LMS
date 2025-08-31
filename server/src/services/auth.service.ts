import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import type { Context } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { env } from "../lib/env";
import { unsign } from "../utils/crypto";
import { sessionStore } from "../lib/redisStore";

const cookieName = env.SESSION_COOKIE_NAME;

export const findUserByUsername = async (username: string) => {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compareSync(password, hashedPassword);
};

export const destroySession = async (c: Context) => {
  const signedSessionCookie = getCookie(c, cookieName);
  if (signedSessionCookie) {
    const id = unsign(signedSessionCookie);
    if (id) await sessionStore.del(id);
  }

  deleteCookie(c, cookieName, { path: "/", domain: env.COOKIE_DOMAIN });
};
