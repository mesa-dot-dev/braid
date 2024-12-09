import { ClassifiedMessage, IService, StatusMessage } from "./interfaces";

import { IProduct } from "./interfaces";

export abstract class Product implements IProduct {
  abstract readonly name: string;
  abstract readonly displayName: string;
  abstract readonly logo: string;

  abstract getServices(): Promise<IService[]>;
  abstract getFeed(): Promise<StatusMessage[]>;

  async classifyMessage(message: StatusMessage): Promise<ClassifiedMessage> {
    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
    if (!CLAUDE_API_KEY) {
      throw new Error("pls add CLAUDE_API_KEY to your .env file");
    }

    const services = await this.getServices();
    const availableServiceNames = services.map((service) => service.name);

    const prompt = `Given this GitHub status message title: "${message.title}"
      And this list of available services: ${availableServiceNames.join(", ")}
      Please return only the names of services that are likely affected by this status message.
      Return the response as a JSON array of strings.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-sonnet-20240229",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      // TODO: create typed errors
      if (!response.ok) {
        throw new Error(`Claude API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.content[0].text;

      let affectedServices: string[] = [];
      try {
        affectedServices = JSON.parse(content);
      } catch (e) {
        console.error("Failed to parse Claude response:", content);
      }

      return {
        ...message,
        product: this.name,
        affectedServices,
      };
    } catch (error) {
      console.error("Error calling Claude API:", error);
      return {
        ...message,
        product: this.name,
        affectedServices: [],
      };
    }
  }
}
