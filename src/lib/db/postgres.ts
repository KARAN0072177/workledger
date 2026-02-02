import { PrismaClient } from "@prisma/client/postgres";

const globalForPostgres = globalThis as unknown as {
  postgres?: PrismaClient;
};

export const postgres =
  globalForPostgres.postgres ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.postgres = postgres;
}