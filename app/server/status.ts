import { createServerFn } from "@tanstack/start";
import { db } from "@/database/db";
import { StatusMessageTable } from "@/database/schema.sql";
import { desc } from "drizzle-orm";

export const getStatusMessages = createServerFn().handler(async () => {
  const messages = await db
    .select()
    .from(StatusMessageTable)
    .orderBy(desc(StatusMessageTable.pubDate))
    .limit(50);

  return messages;
});