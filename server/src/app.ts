import { Hono } from "hono";
import authRoutes from "./routes/auth.route";
import { sessionMiddleware } from "./middlewares/session.middleware";

const app = new Hono();

app.use("*", sessionMiddleware);

app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello bhai Hono!");
});

export default app;
