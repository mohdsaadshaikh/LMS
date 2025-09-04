import { Hono } from "hono";
import prisma from "../config/prisma";
import { findUserById, findUserByUsername } from "../services/auth.service";
import { requireRole } from "../middlewares/auth.middleware";
import { userSchema } from "../schema/user.schema";

const user = new Hono();

user.use("*", requireRole("ADMIN"));

user.get("/", async (c) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "LIBRARIAN",
      },
    });
    return c.json(users);
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

user.get("/:id", async (c) => {
  const { id } = c.req.param();
  try {
    const user = await findUserById(id);
    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
  } catch (error) {
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

user.post("/", async (c) => {
  try {
    const body = await c.req.json().catch(() => null);
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
    const { username, name } = parsed.data;
    const user = await findUserByUsername(username);
    if (user) return c.json({ error: "Username already exists" }, 400);
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
      },
    });
    return c.json(newUser, 201);
  } catch (error) {
    return c.json({ error: "Failed to create user" }, 500);
  }
});

user.patch("/:id", async (c) => {
  const { id } = c.req.param();
  try {
    const user = await findUserById(id);
    if (!user) return c.json({ error: "User not found" }, 404);
    const body = await c.req.json().catch(() => null);
    const parsed = userSchema.partial().safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
    const { username, name } = parsed.data;
    if (username) {
      const existingUser = await findUserByUsername(username);
      if (existingUser && existingUser.id !== id)
        return c.json({ error: "Username already exists" }, 400);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, name },
    });
    return c.json(updatedUser);
  } catch (error) {}
});

user.delete("/:id", async (c) => {
  const { id } = c.req.param();
  try {
    const user = await findUserById(id);
    if (!user) return c.json({ error: "User not found" }, 404);
    await prisma.user.delete({
      where: { id },
    });
    return c.json({ message: "User deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
});

export default user;
