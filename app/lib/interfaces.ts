import { StatusMessageTable } from "@/database/status-message";
import { createSelectSchema } from "drizzle-zod";

export interface Product {
  name: string;
  displayName: string;
  logo: string;
  getServices: () => Promise<Product[]>;
  getFeed: () => Promise<StatusMessage[]>;
}

// export const StatusMessageSchema = createSelectSchema(StatusMessageTable).omit({
//   product: true,
//   affectedServices: true,
// });
export type StatusMessage = Omit<typeof StatusMessageTable.$inferSelect, "product" | "affectedServices">;
export type ClassifiedMessage = typeof StatusMessageTable.$inferSelect;
