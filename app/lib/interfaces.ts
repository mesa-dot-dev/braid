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
export type ClassifiedMessage = typeof StatusMessageTable.$inferSelect;

export abstract class Product implements IProduct {
  abstract readonly name: string;
  abstract readonly displayName: string;
  abstract readonly logo: string;

  abstract getServices(): Promise<IService[]>;
  abstract getFeed(): Promise<StatusMessage[]>;
  abstract classifyMessage(message: StatusMessage): Promise<ClassifiedMessage>;
}
