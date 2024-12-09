import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const StatusMessageTable = pgTable("status_messages", {
  guid: text("guid").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  pubDate: timestamp("pubDate", { mode: "date" }).notNull(),
  product: text("product").notNull(),
  affectedServices: text("affectedServices").notNull(),
});
