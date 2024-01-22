import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3"; // Import from better-sqlite3
import { existsSync } from "fs";
import { Book } from "../generated/types/server";

interface DatabaseSchema {
  book: Partial<Book>;
}

async function seedDatabase(db: Kysely<DatabaseSchema>): Promise<void> {
  console.warn("Creating database schema...");
  await db.schema
    .createTable("book")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("author", "text", (col) => col.notNull())
    .execute();

  console.warn("Seeding database...");
  await db
    .insertInto("book")
    .values([
      {
        title: "The Awakening",
        author: "Kate Chopin",
      },
      {
        title: "City of Glass",
        author: "Paul Auster",
      },
    ])
    .execute();
  console.warn("Done");
}

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
