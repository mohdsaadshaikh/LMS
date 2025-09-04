import * as z from "zod";

export const userSchema = z.object({
  username: z.string({ error: "username is required" }),
  name: z.string({ error: "name is required" }),
});
