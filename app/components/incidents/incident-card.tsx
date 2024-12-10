import { Card, CardContent } from "@/components/ui/card";
import { Incident } from "@/types/incident";
import { StatusBadge, ServiceBadge, SeverityBadge } from "./incident-badges";

export function IncidentCard({ incident }: { incident: Incident }) {
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