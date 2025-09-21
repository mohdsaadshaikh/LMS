import prisma from "../config/prisma";

export const getMemberById = async (id: string) => {
  return prisma.member.findUnique({
    where: { id },
  });
};

export const getMemberByCNIC = async (cnic: string) => {
  return prisma.member.findUnique({
    where: { cnic },
  });
};

export const getMemberByRegNo = async (regNo: string) => {
  return prisma.member.findUnique({
    where: { regNo },
  });
};

export const getMemberByCNICOrRegNo = async (cnic: string, regNo: string) => {
  const memberByCNIC = await prisma.member.findUnique({ where: { cnic } });
  const memberByRegNo = await prisma.member.findUnique({ where: { regNo } });
  return {
    memberByCNIC,
    memberByRegNo,
  };
};
