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

export const getMemberByCNICAndRegNo = async (cnic: string, regNo: string) => {
  await prisma.member.findFirst({
    where: {
      cnic,
      regNo,
    },
  });
};
