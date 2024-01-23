import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3"; // Import from better-sqlite3
import { existsSync } from "fs";
import { DatabaseSchema } from "./types";
import { seedDatabase } from "./database.seed";

export async function createDatabase() {
  const databasePath = "./database.sqlite";
  const dbExists = existsSync(databasePath);

  const db = new Kysely<DatabaseSchema>({
    dialect: new SqliteDialect({
      database: new Database(databasePath, { fileMustExist: false }),
    }),
  });

  if (!dbExists) {
    console.warn("Database does not exist");
    await seedDatabase(db);
  }

  return db;
}
