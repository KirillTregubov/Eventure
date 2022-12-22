import prisma from "models/prisma.model";
import { Request } from "express";

export const createOrganization = async (req: Request) => {
  try {
    // req.body.name
    // mandate that this is called by a user

    const organization = await prisma.organization.create({
      data: {
        organizationName: "Organization 1",
        admins: {
          connect: {
            userId: "605a00a6-86ec-460d-8e46-3cb30412103a",
          },
        },
      },
    });
    return organization;
  } catch (error: unknown) {
    throw error;
  }
};
