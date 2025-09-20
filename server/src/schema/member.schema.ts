import { CardStatus } from "@prisma/client";
import * as z from "zod";

export const createMemberSchema = z.object({
  name: z.string({ error: "name is required" }),
  fatherName: z.string({ error: "fatherName is required" }),
  cnic: z.string({ error: "cnic is required" }),
  phone: z.string({ error: "phone is required" }),
  address: z.string({ error: "address is required" }),
  qualification: z.string({ error: "qualification is required" }),
  regNo: z.string({ error: "regNo is required" }),

  cardIssuedAt: z.date().default(() => new Date()),
  cardExpiresAt: z.date().default(() => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 2);
    return now;
  }),
  cardStatus: z.enum(CardStatus).default(CardStatus.ACTIVE),
});
