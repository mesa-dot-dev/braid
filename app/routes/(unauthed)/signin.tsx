import { SignIn } from "@clerk/tanstack-start";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(unauthed)/signin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.user) throw new Error("Already authenticated");
  },
  onError: (error) => {
    if (error.message === "Already authenticated") throw redirect({ to: "/" });

    throw error;
  },
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
