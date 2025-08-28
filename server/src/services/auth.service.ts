import bcrypt from "bcryptjs";
import prisma from "../config/prisma";

export const findUserByUsername = async (username: string) => {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compareSync(password, hashedPassword);
};
