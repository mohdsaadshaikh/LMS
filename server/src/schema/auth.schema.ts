import * as z from "zod";

export const loginSchema = z.object({
  username: z.string({ error: "username is required" }),
  password: z.string({ error: "password is required" }),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string({ error: "oldPassword is required" }),
  newPassword: z
    .string({ error: "newPassword is required" })
    .min(8, "Password should be at least 8 characters long"),
});
