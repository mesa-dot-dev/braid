import { createFileRoute } from "@tanstack/react-router";
import { IncidentFeed } from "@/components/incidents/incident-feed";
import { Incident } from "@/types/incident";

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

export const Route = createFileRoute("/(authed)/feed")({
  component: FeedComponent,
  loader: () => ({ breadcrumb: "System Status" }),
});

function FeedComponent() {
  return <IncidentFeed incidents={mockIncidents} />;
}