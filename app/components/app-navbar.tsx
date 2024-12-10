import { Link } from "@tanstack/react-router";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";

export function AppNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 shrink-0 items-center border-b bg-background">
      <div className="flex h-full flex-1 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DashboardBreadcrumb />
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <Link
            to="/feed"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-foreground/60" }}
            className="relative px-2 font-medium transition-colors hover:text-foreground/80"
          >
            Feed
          </Link>
          <Link
            to="/config"
            activeProps={{ className: "text-foreground" }}
            inactiveProps={{ className: "text-foreground/60" }}
            className="relative px-2 font-medium transition-colors hover:text-foreground/80"
          >
            Config
          </Link>
        </div>
      </div>
    </header>
  );
} 