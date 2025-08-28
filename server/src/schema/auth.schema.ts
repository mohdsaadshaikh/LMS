import * as z from "zod";

export const loginSchema = z.object({
  username: z.string({ error: "username is required" }),
  password: z.string({ error: "password is required" }),
});
