import { Product } from "@/lib/product";
import { readdirSync } from "node:fs";

export const getProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];
  for (const value of readdirSync("./products")) {
    if (value === "index.ts") continue;

    const result = await import("./products/" + value);
    products.push(new (Object.values(result)[0] as any)() as Product);
  }
  return products;
};
