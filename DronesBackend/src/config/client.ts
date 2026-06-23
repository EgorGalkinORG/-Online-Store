import { PrismaClient } from "../generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
	url: "file:./database.db",
});

export const PRISMA_CLIENT = new PrismaClient({
	adapter,
});
