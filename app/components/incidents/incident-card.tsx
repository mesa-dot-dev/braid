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
    monitoring: "bg-orange-500/10 text-orange-700",
    resolved: "bg-green-500 text-green-950",
  };

  const severityColors = {
    critical: "bg-red-500/10 text-red-700 border-red-200",
    major: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    minor: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-border/40 bg-card/60 backdrop-blur-[2px] hover:border-gray-300/20">
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
              className={`${statusColors[incident.status]} capitalize px-3 py-1 shadow-sm pointer-events-none`}
            >
              {incident.status}
            </Badge>
            <Badge 
              variant="outline" 
              className={`${severityColors[incident.severity]} capitalize px-3 py-1 border shadow-sm pointer-events-none`}
            >
              {incident.severity}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{incident.title}</h3>
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