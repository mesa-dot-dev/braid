import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/users")({
  component: RouteComponent,
  loader: () => {
    return { breadcrumb: "Users" };
  },
});

function RouteComponent() {
  return <>Hello, users!</>;
}
