import { Hono } from "hono";
import { changePasswordSchema, loginSchema } from "../schema/auth.schema";
import {
  destroySession,
  findUserById,
  findUserByUsername,
  hashPassword,
  verifyPassword,
} from "../services/auth.service";
import { createSession } from "../services/session.service";
import { getCookie } from "hono/cookie";
import { env } from "../lib/env";
import { unsign } from "../utils/crypto";
import { sessionStore } from "../lib/redisStore";
import prisma from "../config/prisma";

const auth = new Hono();

const cookieName = env.SESSION_COOKIE_NAME;

auth.post("/login", async (c) => {
  try {
    const body = await c.req.json().catch(() => null);
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

    const { username, password } = parsed.data;

    const user = await findUserByUsername(username);
    const isValidUser = !!user;
    const isValidPassword = user
      ? await verifyPassword(password, user.password)
      : false;

    if (!isValidUser || !isValidPassword)
      return c.json({ error: "Invalid credentials" }, 401);

    const existingCookie = getCookie(c, cookieName);
    if (existingCookie) {
      const oldId = unsign(existingCookie);
      if (oldId) await sessionStore.del(oldId);
    }

    await createSession(user.id, user.role, c);
    return c.json({ user });
  } catch (error) {
    return c.json({ error: "Failed to login" }, 500);
  }
});

auth.get("/me", async (c) => {
  try {
    const sess = (c as any).session as { userId: string } | undefined;
    if (!sess?.userId) {
      return c.json({ error: "Not authenticated" }, 401);
    }

    const user = await findUserById(sess.userId);
    return c.json({ user });
  } catch (error) {
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

auth.get("/logout", async (c) => {
  try {
    await destroySession(c);
    return c.json({ message: "Logged out successfully" });
  } catch (error) {
    return c.json({ error: "Failed to logout" }, 500);
  }
});

auth.post("/change-password", async (c) => {
  try {
    const user = (c as any).sessionUser;
    if (!user) return c.json({ error: "Not authenticated" }, 401);

    const body = await c.req.json().catch(() => null);
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

    const { oldPassword, newPassword } = parsed.data;

    const isValidPassword = await verifyPassword(oldPassword, user.password);
    if (!isValidPassword)
      return c.json({ error: "Old password is incorrect" }, 400);

    if (oldPassword === newPassword)
      return c.json(
        { error: "New password must be different from old password" },
        400
      );

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, isPasswordChanged: true },
    });

    await destroySession(c);
    return c.json({
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    return c.json({ error: "Failed to change password" }, 500);
  }
});

export default auth;
