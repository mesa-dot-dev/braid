import { Card } from "@/components/ui/card";
import { Incident } from "@/types/incident";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const statusColors = {
    investigating: "bg-red-500",
    monitoring: "bg-yellow-500",
    resolved: "bg-green-500",
  };

  const severityColors = {
    critical: "bg-red-100 text-red-800",
    major: "bg-orange-100 text-orange-800",
    minor: "bg-blue-100 text-blue-800",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        {/* Service Alert Banner */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {incident.productIcon && (
              <img 
                src={incident.productIcon} 
                alt={incident.product}
                className="w-10 h-10 object-contain"
              />
            )}
            <div>
              <div className="text-sm font-medium text-gray-500">
                {incident.product}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {incident.service}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge 
              variant="secondary" 
              className={`${statusColors[incident.status]} text-white capitalize px-3 py-1`}
            >
              {incident.status}
            </Badge>
            <Badge 
              variant="secondary" 
              className={`${severityColors[incident.severity]} capitalize px-3 py-1`}
            >
              {incident.severity}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{incident.title}</h3>
            <p className="text-gray-600">{incident.description}</p>
          </div>

          {/* Timestamp */}
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(incident.timestamp, { addSuffix: true })}
          </div>
        </div>
      </div>
    </Card>
  );
} 