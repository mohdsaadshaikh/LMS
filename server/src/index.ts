import { serve } from "@hono/node-server";
import { Hono } from "hono";
import authRoutes from "./routes/auth.route";

const app = new Hono();

app.route("/auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello bhai Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
