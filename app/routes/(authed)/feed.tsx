import { createFileRoute } from "@tanstack/react-router";
import { IncidentFeed } from "@/components/incidents/incident-feed";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { Incident } from "@/types/incident";

// Mock data - replace with real API calls later
const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "GitHub/Actions: Workflow Execution Delays",
    status: "resolved",
    severity: "major",
    timestamp: new Date("2024-03-10T15:30:00"),
    product: "GitHub",
    service: "Actions",
    description: "We observed elevated queue times and execution delays in GitHub Actions workflows.",
    productIcon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  },
  {
    id: "2",
    title: "AWS/EC2: Instance Connectivity Issues",
    status: "investigating",
    severity: "critical",
    timestamp: new Date("2024-03-10T16:45:00"),
    product: "AWS",
    service: "EC2",
    description: "Multiple EC2 instances in us-east-1 are experiencing connectivity issues.",
    productIcon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    id: "3",
    title: "Cloudflare/API Gateway: Rate Limiting Issues",
    status: "monitoring",
    severity: "minor",
    timestamp: new Date("2024-03-10T17:15:00"),
    product: "Cloudflare",
    service: "API Gateway",
    description: "Intermittent rate limiting issues affecting some API Gateway customers.",
    productIcon: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png"
  }
];

export const Route = createFileRoute("/(authed)/feed")({
  component: FeedComponent,
  loader: () => ({ breadcrumb: "System Status" }),
});

function FeedComponent() {
  return (
    <AppSidebar>
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <main className="mx-auto max-w-7xl p-4">
          <IncidentFeed incidents={mockIncidents} />
        </main>
      </div>
    </AppSidebar>
  );
}