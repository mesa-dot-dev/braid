import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.user) throw new Error("Already authenticated");
  },
  onError: (error) => {
    if (error.message === "Already authenticated") throw redirect({ to: "/dashboard" });

    throw error;
  },
});

function RouteComponent() {
  return (
    <>
      <Link to="">Home</Link>
    </>
  );
}
