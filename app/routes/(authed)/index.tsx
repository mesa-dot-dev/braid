import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";

export const Route = createFileRoute("/(authed)/")({
  component: RouteComponent,
  loader: () => ({ breadcrumb: "Dashboard" }),
  beforeLoad: ({ context }) => {
    // if (!context.user) throw new Error("Not authenticated");
  },
  onError: (error) => {
    if (error.message === "Not authenticated") throw redirect({ to: "/signin" });
    throw error;
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh">
      <AppNavbar />
      <div className="flex flex-1 flex-col pt-16">
        {/* <AppSidebar> */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
        {/* </AppSidebar> */}
      </div>
    </div>
  );
}
