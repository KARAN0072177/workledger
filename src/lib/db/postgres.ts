import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __postgresPrisma: PrismaClient | undefined;
}

export const postgres =
  global.__postgresPrisma ??
  new PrismaClient({ log: ["error"] });

if (process.env.NODE_ENV !== "production") {
  global.__postgresPrisma = postgres;
}