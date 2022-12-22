import { PrismaClient } from "@prisma/client";

// add prisma to the NodeJS global type
// interface CustomNodeJsGlobal extends typeof globalThis {
//   prisma: PrismaClient;
// }

declare global {
  var prisma: PrismaClient;
}

const prisma = global.prisma || new PrismaClient();

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
