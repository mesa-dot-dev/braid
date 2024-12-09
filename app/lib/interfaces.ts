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
export interface ClassifiedMessage extends StatusMessage {
  affectedServices: string[];
  classifyAffectedServices: (
    title: string, 
    availableServices: string[]
  ) => Promise<string[]>;
}

export async function createClassifiedMessage(
  message: StatusMessage,
  availableServices: string[]
): Promise<ClassifiedMessage> {
  const affectedServices = await classifyWithLLM(message.title, availableServices);
  return {
    ...message,
    affectedServices,
    classifyAffectedServices: async (title, services) => classifyWithLLM(title, services)
  };
}

async function classifyWithLLM(
  title: string, 
  availableServices: string[]
): Promise<string[]> {
  // Here you would implement the Claude API call
  // Example implementation:
  const prompt = `Given this GitHub status message title: "${title}"
    And this list of available services: ${availableServices.join(', ')}
    Please return only the names of services that are likely affected by this status message.
    Return the response as a JSON array of strings.`;
    
  // TODO: Implement actual Claude API call here
  // For now, returning mock data
  return ['github-actions', 'api'];
}
