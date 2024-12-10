export type Incident = {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "critical" | "major" | "minor";
  timestamp: Date;
  service: "GitHub" | "AWS" | "Cloudflare";
  description: string;
}; 