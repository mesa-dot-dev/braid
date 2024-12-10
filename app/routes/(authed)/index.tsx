import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { useAuth } from "@clerk/tanstack-start";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import { getAuth } from "@clerk/tanstack-start/server";
import { clerkClient } from "@clerk/tanstack-start/server";

export const Route = createFileRoute("/(authed)/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.userId) throw redirect({ to: "/sign-in/$" });
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh">
      <AppNavbar />
      <div className="flex flex-1 flex-col pt-16">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
