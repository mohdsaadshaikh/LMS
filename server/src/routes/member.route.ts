import { Hono } from "hono";
import prisma from "../config/prisma";
import { requireRole } from "../middlewares/auth.middleware";
import {
  createMemberSchema,
  updateMemberSchema,
} from "../schema/member.schema";
import {
  getMemberByCNICOrRegNo,
  getMemberById,
} from "../services/member.service";
getMemberById;

const member = new Hono();

member.use("*", requireRole("ADMIN", "LIBRARIAN"));

member.get("/", async (c) => {
  try {
    const members = await prisma.member.findMany();
    if (members.length === 0) return c.json({ error: "No members found" }, 404);
    return c.json({ length: members.length, members });
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
    if (!body) return c.json({ error: "Invalid Data" }, 400);

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

    const { memberByCNIC, memberByRegNo } = await getMemberByCNICOrRegNo(
      cnic,
      regNo
    );
    if (memberByCNIC || memberByRegNo)
      return c.json({ error: "Member already exists" }, 400);

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
    console.error(error);
    return c.json({ error: "Failed to create member" }, 500);
  }
});

member.patch("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    if (!id) return c.json({ error: "Member ID is required" }, 400);

    const member = await getMemberById(id);
    if (!member) return c.json({ error: "Member not found" }, 404);

    const body = await c.req.json().catch(() => null);
    if (!body) return c.json({ error: "Invalid Data" }, 400);

    const parsed = updateMemberSchema.safeParse(body);
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

    await prisma.member.update({
      where: { id },
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

    return c.json({ message: "Member updated successfully" });
  } catch (error) {
    return c.json({ error: "Failed to update member" }, 500);
  }
});

member.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    if (!id) return c.json({ error: "Member ID is required" }, 400);

    const member = await getMemberById(id);
    if (!member) return c.json({ error: "Member not found" }, 404);

    await prisma.member.delete({ where: { id } });
    return c.json({ message: "Member deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete member" }, 500);
  }
});

export default member;
