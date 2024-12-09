// What we send to Slack
export interface SlackWebhookMessage {
  text: string;
  blocks?: Array<any>;
  channel?: string;
}

// Configurations about how we send to Slack (eg default channel)
export interface SlackNotificationConfig {
  webhookUrl: string;
  defaultChannel: string;
} 