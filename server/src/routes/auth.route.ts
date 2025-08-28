import { Hono } from "hono";
import { findUserByUsername, verifyPassword } from "../services/auth.service";
import { loginSchema } from "../schema/auth.schema";

const auth = new Hono();

auth.post("/login", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const { username, password } = parsed.data;
  const user = await findUserByUsername(username);
  if (!user) return c.json({ error: "User not found" }, 404);

  const ok = await verifyPassword(password, user.password);
  if (!ok) return c.json({ error: "Invalid password" }, 401);
  return c.json({ user });
});

export default auth;
