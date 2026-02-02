import { PrismaClient } from "@prisma/client/mongo";

const globalForMongo = globalThis as unknown as {
  mongo?: PrismaClient;
};

export const mongo =
  globalForMongo.mongo ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongo = mongo;
}