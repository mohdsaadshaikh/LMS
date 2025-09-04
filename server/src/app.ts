import { Hono } from "hono";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { requireRole, sessionMiddleware } from "./middlewares/auth.middleware";
import { Role } from "@prisma/client";

const app = new Hono();

app.use("*", sessionMiddleware);

app.route("/auth", authRoutes);
app.route("/users", userRoutes);

app.get("/", requireRole(Role.LIBRARIAN), (c) => {
  return c.text("Hello bhai Hono!");
});

export default app;
