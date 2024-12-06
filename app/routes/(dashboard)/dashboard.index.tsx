import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-muted/50 p-4">
        <p>This is the default dashboard view</p>
        <Link to="/" className="underline">
          Go home
        </Link>
      </div>
      <Link to="/dashboard/tasks" className="aspect-video rounded-xl bg-muted/50 p-4">
        Click to go to Tasks
      </Link>
      <Link to="/dashboard/users" className="aspect-video rounded-xl bg-muted/50 p-4">
        Click to go to Users
      </Link>
    </div>
  );
}
