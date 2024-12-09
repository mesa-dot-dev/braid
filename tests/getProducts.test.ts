import { getProducts } from "../products/index";
import { Product } from "../app/lib/product";
import { describe, expect, it, vi } from "vitest";

// vi.mock("node:fs", () => ({
//   readdirSync: vi.fn(() => ["product1.ts", "product2.ts"]),
// }));

// vi.mock("../app/products/product1.ts", () => ({
//   default: { id: 1, name: "Product 1" },
// }));

// vi.mock("../app/products/product2.ts", () => ({
//   default: { id: 2, name: "Product 2" },
// }));

describe("getProducts", () => {
  it("should import products and return them as an array", async () => {
    const products: Product[] = await getProducts();

    products.forEach((product) => {
      expect(product).toBeInstanceOf(Product);
    });

    const names = ["github"];

    let filteredProducts = products.filter((product) => names.includes(product.name));

    expect(filteredProducts.length).toEqual(names.length);
    expect(filteredProducts[0].name).toEqual("github");
  });
});
