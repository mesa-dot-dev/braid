import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  Github, 
  GitBranch, 
  Globe, 
  Package, 
  Cloud,
  Server,
  Database,
  FileCode,
  Plus
} from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(authed)/config")({
  component: ConfigComponent,
  loader: () => ({ breadcrumb: "Service Configuration" }),
});

// This would typically come from your API
const services = [
  {
    id: "github",
    name: "GitHub",
    description: "Code hosting and development platform",
    icon: "github",
    products: [
      { id: "actions", name: "GitHub Actions", enabled: false },
      { id: "api", name: "GitHub API", enabled: true },
      { id: "pages", name: "GitHub Pages", enabled: false },
      { id: "packages", name: "GitHub Packages", enabled: false },
    ],
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    description: "Cloud computing services",
    icon: "aws",
    products: [
      { id: "ec2", name: "EC2", enabled: true },
      { id: "s3", name: "S3", enabled: true },
      { id: "lambda", name: "Lambda", enabled: false },
      { id: "rds", name: "RDS", enabled: true },
    ],
  },
  // Add more services as needed
];

function ConfigComponent() {
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const [enabledProducts, setEnabledProducts] = useState<Set<string>>(new Set(
    services.flatMap(service => 
      service.products
        .filter(product => product.enabled)
        .map(product => `${service.id}-${product.id}`)
    )
  ));

  const toggleService = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const toggleProduct = (serviceId: string, productId: string) => {
    const productKey = `${serviceId}-${productId}`;
    const newEnabled = new Set(enabledProducts);
    if (newEnabled.has(productKey)) {
      newEnabled.delete(productKey);
    } else {
      newEnabled.add(productKey);
    }
    setEnabledProducts(newEnabled);
  };

  const getIconForProduct = (serviceId: string, productId: string) => {
    if (serviceId === 'github') {
      switch (productId) {
        case 'actions': return <GitBranch className="h-5 w-5" />;
        case 'api': return <Github className="h-5 w-5" />;
        case 'pages': return <Globe className="h-5 w-5" />;
        case 'packages': return <Package className="h-5 w-5" />;
        default: return <Github className="h-5 w-5" />;
      }
    } else if (serviceId === 'aws') {
      switch (productId) {
        case 'ec2': return <Server className="h-5 w-5" />;
        case 's3': return <Cloud className="h-5 w-5" />;
        case 'lambda': return <FileCode className="h-5 w-5" />;
        case 'rds': return <Database className="h-5 w-5" />;
        default: return <Cloud className="h-5 w-5" />;
      }
    }
    return <Cloud className="h-5 w-5" />;
  };

  return (
    <AppSidebar>
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <main className="mx-auto max-w-7xl p-4">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Service Configuration</h1>
              <p className="text-muted-foreground mt-2">
                Choose which services and products you want to monitor. You'll receive notifications
                when there are incidents affecting your selected products.
              </p>
            </div>

            <div className="grid gap-6">
              {services.map((service) => (
                <Collapsible
                  key={service.id}
                  open={expandedServices.has(service.id)}
                  onOpenChange={() => toggleService(service.id)}
                >
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="flex flex-row items-center justify-between p-6">
                        <div>
                          <h3 className="text-xl font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          {expandedServices.has(service.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="p-6 pt-0">
                        <div className="grid grid-cols-4 gap-4">
                          {service.products.map((product) => {
                            const isEnabled = enabledProducts.has(`${service.id}-${product.id}`);
                            return (
                              <Button
                                key={product.id}
                                variant={isEnabled ? "default" : "outline"}
                                className={cn(
                                  "flex flex-col items-center justify-center gap-2 h-24 transition-[background-color] duration-75",
                                  isEnabled && "bg-primary text-primary-foreground",
                                  !isEnabled && "hover:bg-primary/10"
                                )}
                                onClick={() => toggleProduct(service.id, product.id)}
                              >
                                {getIconForProduct(service.id, product.id)}
                                <span className="text-sm font-medium">{product.name}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
              
              <Card className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-center p-6">
                  <div className="flex flex-col items-center text-center">
                    <Plus className="h-5 w-5 mb-2 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">Add a new service</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure a new service integration
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AppSidebar>
  );
} 