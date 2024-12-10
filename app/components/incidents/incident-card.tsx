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
        {/* Product and Service Header */}
        <div className="flex items-center gap-4 mb-4">
          {incident.productIcon && (
            <img 
              src={incident.productIcon} 
              alt={incident.product}
              className="w-8 h-8 object-contain"
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {incident.product}
              </h3>
              <span className="text-gray-400">/</span>
              <h4 className="text-lg font-medium text-gray-600">
                {incident.service}
              </h4>
            </div>
          </div>
        </div>

        {/* Status and Severity */}
        <div className="flex gap-2 mb-3">
          <Badge 
            variant="secondary" 
            className={`${statusColors[incident.status]} text-white capitalize`}
          >
            {incident.status}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`${severityColors[incident.severity]} capitalize`}
          >
            {incident.severity}
          </Badge>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold mb-2">{incident.title}</h3>
        <p className="text-gray-600 mb-4">{incident.description}</p>

        {/* Timestamp */}
        <div className="text-sm text-gray-500">
          {formatDistanceToNow(incident.timestamp, { addSuffix: true })}
        </div>
      </div>
    </Card>
  );
} 