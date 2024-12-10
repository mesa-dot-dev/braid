import { Incident } from "@/types/incident";
import { IncidentCard } from "./incident-card";

export function IncidentFeed({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-6">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
} 