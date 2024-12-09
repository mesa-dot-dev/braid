import { createFileRoute, isMatch, Link, Outlet, redirect, useMatches } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

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
    <AppSidebar>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DashboardBreadcrumb />
        </div>
      </header>
      <nav className="border-b px-4">
        <div className="flex h-10 items-center gap-4">
          <Link
            to="/feed"
            activeProps={{ className: "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground" }}
            inactiveProps={{ className: "text-foreground/60" }}
            className="relative h-10 px-2 font-medium transition-colors hover:text-foreground/80"
          >
            Feed
          </Link>
          <Link
            to="/config"
            activeProps={{ className: "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground" }}
            inactiveProps={{ className: "text-foreground/60" }}
            className="relative h-10 px-2 font-medium transition-colors hover:text-foreground/80"
          >
            Config
          </Link>
        </div>
      </nav>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Outlet />
      </div>
    </AppSidebar>
  );
}

const DashboardBreadcrumb = () => {
  const matches = useMatches();

  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, "loaderData.breadcrumb"));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) =>
          i + 1 < matchesWithCrumbs.length ? (
            <Fragment key={match.loaderData?.breadcrumb}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link from={match.fullPath}>{match.loaderData?.breadcrumb}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          ) : (
            <BreadcrumbItem key={match.loaderData?.breadcrumb}>
              <BreadcrumbPage>{match.loaderData?.breadcrumb}</BreadcrumbPage>
            </BreadcrumbItem>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
