import { SignUp } from "@clerk/tanstack-start";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up/$")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.userId) throw redirect({ to: "/" });
  },
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SignUp signInForceRedirectUrl={"/signed-in"} forceRedirectUrl={"/signed-in"} />
    </div>
  );
}
