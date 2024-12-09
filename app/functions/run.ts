import { getProducts } from "../../products";

export async function handler() {
  console.log(`[${new Date().toISOString()}] Running Status Check`);

  // Fetch new messages from all services
  const products = await getProducts();
  const messages = await Promise.all(products.map((product) => product.getFeed()));

  // Classify messages

  // Store messages in database

  // Notify relevant slack apps
}
