import { Card } from "@/components/ui/card";
import { Incident } from "@/types/incident";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const statusColors = {
    investigating: "bg-destructive text-destructive-foreground",
    monitoring: "bg-accent text-accent-foreground",
    resolved: "bg-muted text-muted-foreground",
  };

  const severityColors = {
    critical: "bg-destructive/10 text-destructive border-destructive/20",
    major: "bg-accent/10 text-accent border-accent/20",
    minor: "bg-secondary text-secondary-foreground",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-border/40 bg-card/60 backdrop-blur-[2px] hover:border-accent/20">
      <div className="p-6">
        {/* Service Alert Banner */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {incident.productIcon && (
              <div className="w-10 h-10 rounded-md bg-background/80 flex items-center justify-center p-2 border border-border/40 shadow-sm">
                <img 
                  src={incident.productIcon} 
                  alt={incident.product}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                {incident.product}
              </div>
              <div className="text-xl font-semibold text-foreground">
                {incident.service}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={`${statusColors[incident.status]} capitalize px-3 py-1 shadow-sm`}
            >
              {incident.status}
            </Badge>
            <Badge 
              variant="outline" 
              className={`${severityColors[incident.severity]} capitalize px-3 py-1 border shadow-sm`}
            >
              {incident.severity}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent-foreground">{incident.title}</h3>
            <p className="text-muted-foreground">{incident.description}</p>
          </div>

          {/* Timestamp */}
          <div className="text-sm text-muted-foreground/80">
            <div>{format(incident.timestamp, 'MMM dd, yyyy \'at\' HH:mm')}</div>
          </div>
        </div>
      </div>
    </Card>
  );
} 