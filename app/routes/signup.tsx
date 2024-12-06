import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SignUp } from "@/features/auth/components/sign-up";

export const Route = createFileRoute("/signup")({
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
      <SignUp />
      <Link to="/">Home</Link>
    </>
  );
}
