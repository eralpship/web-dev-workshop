import { Kysely } from "kysely";
import { DatabaseSchema } from "./types";

export async function seedDatabase(db: Kysely<DatabaseSchema>): Promise<void> {
  console.warn("Creating database schema...");
  await db.schema
    .createTable("serviceArea")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("countryCode", "text", (col) => col.notNull())
    .addColumn("latitude", "real", (col) => col.notNull())
    .addColumn("longitude", "real", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("bot")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("serviceAreaId", "integer", (col) =>
      col.references("serviceArea.id")
    )
    .execute();

  await db.schema
    .createTable("supportTicket")
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("botId", "integer", (col) => col.references("bot.id"))
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("status", "text", (col) => col.notNull())
    .addColumn("issue", "text", (col) => col.notNull())
    .execute();

  console.warn("Seeding database...");

  console.warn("Inserting bots...");
  await db
    .insertInto("bot")
    .values([
      { name: "6E1" },
      { name: "6E2" },
      { name: "6E3" },
      { name: "6E4" },
      { name: "6E5" },
      { name: "6E6" },
      { name: "6E7" },
      { name: "6E8" },
      { name: "6E9" },
      { name: "6E10" },
      { name: "6E11" },
      { name: "6E12" },
    ])
    .execute();

  console.warn("Inserting service areas...");
  await db
    .insertInto("serviceArea")
    .values([
      {
        name: "Helsinki",
        countryCode: "FI",
        latitude: 60.1699,
        longitude: 24.9384,
      },
      {
        name: "London",
        countryCode: "GB",
        latitude: 51.5074,
        longitude: 0.1278,
      },
      {
        name: "Melbourne",
        countryCode: "AU",
        latitude: -37.8136,
        longitude: 144.9631,
      },
      {
        name: "Tallinn",
        countryCode: "EE",
        latitude: 59.4369,
        longitude: 24.7536,
      },
    ])
    .execute();

  console.warn("Seeding Complete!");
}
