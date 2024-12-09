import { StatusMessageTable } from "@/database/status-message";

export type RSSFeed = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export interface IProduct {
  name: string;
  displayName: string;
  logo: string;
  getServices: () => Promise<IService[]>;
  getFeed: () => Promise<StatusMessage[]>;
  classifyMessage: (message: StatusMessage) => Promise<ClassifiedMessage>;
}

export interface IService {
  name: string;
  displayName: string;
}

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

export abstract class Product implements IProduct {
  abstract readonly name: string;
  abstract readonly displayName: string;
  abstract readonly logo: string;

  abstract getServices(): Promise<IService[]>;
  abstract getFeed(): Promise<StatusMessage[]>;
  abstract classifyMessage(message: StatusMessage): Promise<ClassifiedMessage>;
}
