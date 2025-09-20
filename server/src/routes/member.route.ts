import { Hono } from "hono";
import { requireRole } from "../middlewares/auth.middleware";
import { createMemberSchema } from "../schema/member.schema";
import prisma from "../config/prisma";
import { getMemberById, getMemberByCNIC } from "../services/member.service";
getMemberById;

const member = new Hono();

member.use("*", requireRole("ADMIN"));

member.get("/", async (c) => {
  try {
    const members = await prisma.member.findMany();
    if (!members) c.json({ error: "No members found" }, 404);
    return c.json(members);
  } catch (error) {
    return c.json({ error: "Failed to fetch members" }, 500);
  }
});

member.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    if (!id) return c.json({ error: "Member ID is required" }, 400);

    const member = await getMemberById(id);
    if (!member) return c.json({ error: "Member not found" }, 404);

    return c.json(member);
  } catch (error) {
    return c.json({ error: "Failed to fetch member" }, 500);
  }
});

member.post("/", async (c) => {
  try {
    const body = await c.req.json().catch(() => null);
    if (!body) return c.json({ error: "Invalid JSON body" }, 400);

    const parsed = createMemberSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: parsed.error.issues }, 400);

    const {
      name,
      fatherName,
      cnic,
      phone,
      address,
      qualification,
      regNo,
      cardIssuedAt,
      cardExpiresAt,
      cardStatus,
    } = parsed.data;

    const existingMember = await getMemberByCNIC(cnic);
    if (existingMember) return c.json({ error: "Member already exist" }, 400);

    await prisma.member.create({
      data: {
        name,
        fatherName,
        cnic,
        phone,
        address,
        qualification,
        regNo,
        cardIssuedAt,
        cardExpiresAt,
        cardStatus,
      },
    });
    return c.json({ message: "Member created successfully" }, 201);
  } catch (error) {
    return c.json({ error: "Failed to create member" }, 500);
  }
});

export default member;
