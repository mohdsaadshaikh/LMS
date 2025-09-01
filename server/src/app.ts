import { Hono } from "hono";
import authRoutes from "./routes/auth.route";
import { requireRole, sessionMiddleware } from "./middlewares/auth.middleware";
import { Role } from "@prisma/client";

const app = new Hono();

app.use("*", sessionMiddleware);

app.route("/auth", authRoutes);

app.get("/", requireRole(Role.LIBRARIAN), (c) => {
  return c.text("Hello bhai Hono!");
});

export default app;
