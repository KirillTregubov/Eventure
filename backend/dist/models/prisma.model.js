"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = global.prisma || new client_1.PrismaClient();
// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === "development")
    global.prisma = prisma;
exports.default = prisma;
