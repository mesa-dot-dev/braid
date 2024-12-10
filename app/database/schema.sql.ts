import { text, pgTable, timestamp, jsonb, boolean, serial, integer, primaryKey } from "drizzle-orm/pg-core";

export const SlackInstallationTable = pgTable("slack_installations", {
  id: serial("id").primaryKey(),
  teamId: text("team_id").notNull().unique(),
  teamName: text("team_name").notNull(),
  bot: jsonb("bot")
    .$type<{
      id: string;
      token: string;
      scopes: string[];
      userId: string;
    }>()
    .notNull(),
  incomingWebhook: jsonb("incoming_webhook")
    .$type<{
      channel: string;
      channelId: string;
      configurationUrl: string;
      url: string;
    }>()
    .notNull(),
});

export const ConfigTable = pgTable(
  "config",
  {
    installationId: integer("installation_id").references(() => SlackInstallationTable.id),
    product: text("product").notNull(),
    services: jsonb("services").$type<string[]>().notNull().default([]),
  },
  (table) => [primaryKey({ columns: [table.installationId, table.product] })],
);

export const StatusMessageTable = pgTable("status_messages", {
  guid: text("guid").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  pubDate: timestamp("pub_date", { mode: "date" }).notNull(),
  product: text("product").notNull(),
  affectedServices: jsonb("affected_services").$type<string[]>().notNull().default([]),
});
