import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const hashPassword = bcrypt.hashSync("admin123", 10);

await prisma.user.create({
  data: {
    name: "Admin",
    username: "admin",
    password: hashPassword,
    role: "ADMIN",
  },
});
