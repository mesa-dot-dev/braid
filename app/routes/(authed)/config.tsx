import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authed)/config")({
  component: ConfigComponent,
  loader: () => ({ breadcrumb: "Config" }),
});

function ConfigComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Config</h1>
      {/* Add your config content here */}
    </div>
  );
} 