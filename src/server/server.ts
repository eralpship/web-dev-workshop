import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { SupportTicketStatus, type Resolvers } from "../generated/types/server";
import { createDatabase } from "./database";
import { ServerContext } from "./types";

const db = await createDatabase();

const typeDefs = readFileSync("./src/server/schema.graphql", {
  encoding: "utf-8",
});

const resolvers: Resolvers = {
  Query: {
    bots: async (_, __, context) => {
      const bots = await context.db.selectFrom("bot").selectAll().execute();
      return bots;
    },
    serviceAreas: async (_, __, context) => {
      const serviceAreas = await context.db
        .selectFrom("serviceArea")
        .selectAll()
        .execute();
      return serviceAreas;
    },
    serviceArea: async (_, { id }, context) => {
      const serviceArea = await context.db
        .selectFrom("serviceArea")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
      return serviceArea;
    },
  },
  Bot: {
    operational: async (parent, _, context) => {
      const supportTickets = await context.db
        .selectFrom("supportTicket")
        .select("id")
        .where("botId", "=", parent.id)
        .execute();

      const hasSupportTickets = supportTickets.length > 0;
      return !hasSupportTickets;
    },
    supportTickets: async (parent, _, context) => {
      const supportTickets = await context.db
        .selectFrom("supportTicket")
        .selectAll()
        .where("botId", "=", parent.id)
        .execute();
      return supportTickets;
    },
  },
  ServiceArea: {
    bots: async (parent, _, context) => {
      const bots = await context.db
        .selectFrom("bot")
        .selectAll()
        .where("serviceAreaId", "=", parent.id)
        .execute();
      return bots;
    },
  },
  Mutation: {
    createSupportTicket: async (_, { botId, title, issue }, context) => {
      const supportTicket = await context.db
        .insertInto("supportTicket")
        .values({ botId, title, status: SupportTicketStatus.Open, issue })
        .returningAll()
        .executeTakeFirstOrThrow();
      return supportTicket;
    },
    updateSupportTicketStatus: async (_, { id, status }, context) => {
      const supportTicket = await context.db
        .updateTable("supportTicket")
        .set({ status })
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();
      return supportTicket;
    },
    assignBotToServiceArea: async (_, { botId, serviceAreaId }, context) => {
      const bot = await context.db
        .updateTable("bot")
        .set({ serviceAreaId })
        .where("id", "=", botId)
        .returningAll()
        .executeTakeFirstOrThrow();
      return bot;
    },
  },
};

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
});

const mockServerResponseTime = () =>
  new Promise((resolve) => setTimeout(resolve, 800));

const { url } = await startStandaloneServer(server, {
  context: async () => {
    await mockServerResponseTime();
    return { db };
  },
  listen: { port: 4000 },
});

console.log(`GraphQL Server ready at: ${url}`);
