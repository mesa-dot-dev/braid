import { Link } from "@tanstack/react-router";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";

export function AppNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border/60 bg-background/95">
      <header className="flex h-16 items-center px-4 lg:px-6">
        <div className="flex flex-1 items-center gap-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <img
                src="/images/braid-logo-light.svg"
                alt="Braid Logo"
                className="h-7 w-auto"
              />
            </Link>
            <Separator orientation="vertical" className="mx-1 h-5 opacity-30" />
            <DashboardBreadcrumb />
          </div>
          
          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/feed"
              activeProps={{ 
                className: "text-foreground bg-muted" 
              }}
              inactiveProps={{ 
                className: "text-muted-foreground hover:text-foreground hover:bg-muted/60" 
              }}
              className="relative px-3 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out"
            >
              Feed
            </Link>
            <Link
              to="/config"
              activeProps={{ 
                className: "text-foreground bg-muted" 
              }}
              inactiveProps={{ 
                className: "text-muted-foreground hover:text-foreground hover:bg-muted/60" 
              }}
              className="relative px-3 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out"
            >
              Config
            </Link>
          </div>
        </div>
      </header>
    </nav>
  );
} 