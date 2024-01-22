import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import type { Book, Resolvers } from "../generated/types/server";
import { createDatabase } from "./database";

const db = await createDatabase();

export interface ServerContext {
  db: typeof db;
}

const typeDefs = readFileSync("./src/server/schema.graphql", {
  encoding: "utf-8",
});

const resolvers: Resolvers = {
  Query: {
    books: async (_, __, context) => {
      const books = await context.db.selectFrom("book").selectAll().execute();
      return books as Book[];
    },
  },
};

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ db }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
