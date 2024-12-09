import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authed)/feed")({
  component: FeedComponent,
  loader: () => ({ breadcrumb: "Feed" }),
});

function FeedComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Feed</h1>
      {/* Add your feed content here */}
    </div>
  );
} 