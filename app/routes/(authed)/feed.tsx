import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Route = createFileRoute("/(authed)/feed")({
  component: FeedComponent,
  loader: () => ({ breadcrumb: "System Status" }),
});

type Incident = {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "critical" | "major" | "minor";
  timestamp: Date;
  service: "GitHub" | "AWS" | "Cloudflare";
  description: string;
};

// Mock data - replace with real API calls later
const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "API Performance Degradation",
    status: "resolved",
    severity: "major",
    timestamp: new Date("2024-03-10T15:30:00"),
    service: "GitHub",
    description: "We observed elevated error rates and latency across GitHub API endpoints.",
  },
  {
    id: "2",
    title: "EC2 Instance Connectivity Issues",
    status: "investigating",
    severity: "critical",
    timestamp: new Date("2024-03-10T16:45:00"),
    service: "AWS",
    description: "Multiple EC2 instances in us-east-1 are experiencing connectivity issues.",
  },
];

function FeedComponent() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-6">
        {mockIncidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={incident.status} />
              <ServiceBadge service={incident.service} />
              <SeverityBadge severity={incident.severity} />
            </div>
            <h2 className="text-lg font-semibold tracking-tight">{incident.title}</h2>
            <p className="text-sm text-muted-foreground">{incident.description}</p>
          </div>
          <time className="text-sm text-muted-foreground">
            {incident.timestamp.toLocaleString()}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: Incident["status"] }) {
  const variants = {
    investigating: "bg-warning text-warning-foreground hover:bg-warning/80",
    identified: "bg-info text-info-foreground hover:bg-info/80",
    monitoring: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    resolved: "bg-success text-success-foreground hover:bg-success/80",
  };

  return (
    <Badge className={cn("capitalize", variants[status])}>
      {status}
    </Badge>
  );
}

function ServiceBadge({ service }: { service: Incident["service"] }) {
  return (
    <Badge variant="outline" className="font-medium">
      {service}
    </Badge>
  );
}

function SeverityBadge({ severity }: { severity: Incident["severity"] }) {
  const variants = {
    critical: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    major: "bg-warning text-warning-foreground hover:bg-warning/80",
    minor: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <Badge className={cn("capitalize", variants[severity])}>
      {severity}
    </Badge>
  );
}