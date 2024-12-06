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

export const Route = createFileRoute("/(dashboard)/dashboard")({
  component: RouteComponent,
  loader: () => ({ breadcrumb: "Dashboard" }),
  beforeLoad: ({ context }) => {
    if (!context.user) throw new Error("Not authenticated");
  },
  onError: (error) => {
    if (error.message === "Not authenticated") throw redirect({ to: "/signin" });

    throw error;
  },
});

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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Outlet />
      </div>
    </AppSidebar>
  );
}
