import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SignIn } from "@/features/auth/components/sign-in";

export const Route = createFileRoute("/signin")({
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
      <SignIn />
      <Link to="/">Home</Link>
    </>
  );
}
