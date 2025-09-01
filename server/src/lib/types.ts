import type { Role } from "@prisma/client";

export type SessionData = {
  sessionId: string;
  userId: string;
  role: Role;
  createdAt: number;
  lastActive: number;
};
