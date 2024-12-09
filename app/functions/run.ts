import { db } from "@/database/db";
import { getProducts } from "../../products";
import { StatusMessageTable } from "@/database/schema.sql";
import { eq, desc } from "drizzle-orm";
import { ClassifiedMessage } from "@/lib/interfaces";

export async function handler() {
  console.log(`[${new Date().toISOString()}] Running Status Check`);

  // Fetch new messages from all services
  // Classify messages
  // Store messages in database
  const products = await getProducts();
  const newMessages = await products.reduce(
    async (acc, product) => {
      const messages = await product.refreshStatusMessages();
      const accResolved = await acc;
      return {
        ...accResolved,
        [product.name]: messages,
      };
    },
    Promise.resolve({} as Record<string, ClassifiedMessage[]>),
  );

  // Notify relevant slack apps
}
