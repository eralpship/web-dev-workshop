import { Generated, Kysely } from "kysely";
import { Bot, ServiceArea, SupportTicket } from "../generated/types/server";

type GqlTypeToDbType<
  T extends { id: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitKeys extends keyof T = never
> = Omit<T, "id" | OmitKeys> & {
  id: Generated<string>;
};

export interface DatabaseSchema {
  serviceArea: GqlTypeToDbType<ServiceArea, "bots">;
  bot: GqlTypeToDbType<Bot, "operational" | "supportTickets">;
  supportTicket: GqlTypeToDbType<SupportTicket>;
}

export interface ServerContext {
  db: Kysely<DatabaseSchema>;
}
