import { Prisma } from "@prisma/client";
import prisma from "models/prisma.model";
import { UniqueConstraintException } from "models/exceptions.model";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const createUser = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        username: "Alice",
        firstName: "Alice",
        lastName: "Doe",
        email: "email@email.com",
      },
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if ((error.meta?.target as String[]).includes("username")) {
          throw new UniqueConstraintException("Username taken");
        } else if ((error.meta?.target as String[]).includes("email")) {
          throw new UniqueConstraintException("Email already in use");
        }
      }
    }
    throw error;
  }
};
