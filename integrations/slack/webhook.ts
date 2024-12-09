import { SlackWebhookMessage, SlackNotificationConfig } from './types';

export class SlackWebhook {
  private config: SlackNotificationConfig;

  constructor(config: SlackNotificationConfig) {
    this.config = config;
  }

  async notify(message: SlackWebhookMessage): Promise<void> {
    try {
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          channel: message.channel || this.config.defaultChannel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Slack webhook failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
      throw error;
    }
  }
} 