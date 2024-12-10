import { Incident } from "@/types/incident";
import { IncidentCard } from "./incident-card";

export function IncidentFeed({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="w-full">
      <div className="space-y-4">
        {incidents.length === 0 ? (
          <div className="text-center p-8 rounded-lg border border-border bg-card">
            <p className="text-muted-foreground">No incidents found</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))
        )}
      </div>
    </div>
  );
} 