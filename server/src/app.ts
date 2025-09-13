import { Hono } from "hono";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { requireRole, sessionMiddleware } from "./middlewares/auth.middleware";
import { Role } from "@prisma/client";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: "http://localhost:4321",
    // allowHeaders: ["Access-Control-Allow-Credentials", "Content-Type"],
    credentials: true,
  })
);
app.use("*", sessionMiddleware);

app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/users", userRoutes);

app.get("/", requireRole(Role.LIBRARIAN), (c) => {
  return c.text("Hello bhai Hono!");
});

export default app;
