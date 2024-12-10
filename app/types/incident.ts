export type Incident = {
  id: string;
  title: string;
  status: "investigating" | "monitoring" | "resolved";
  severity: "critical" | "major" | "minor";
  timestamp: Date;
  product: string;
  service: string;
  description: string;
  productIcon?: string;
}; 