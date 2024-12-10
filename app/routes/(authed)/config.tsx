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
  Plus,
  Check
} from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/(authed)/config")({
  component: ConfigComponent,
  loader: () => ({}),
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
  const [searchQuery, setSearchQuery] = useState("");
  const [productSearchQueries, setProductSearchQueries] = useState<Record<string, string>>({});

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

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.products.some(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getFilteredProducts = (service: typeof services[0]) => {
    const productSearch = productSearchQueries[service.id] || "";
    return service.products.filter(product =>
      product.name.toLowerCase().includes(productSearch.toLowerCase())
    );
  };

  const handleProductSearch = (serviceId: string, query: string) => {
    setProductSearchQueries(prev => ({
      ...prev,
      [serviceId]: query
    }));
  };

  return (
    <AppSidebar>
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <main className="container mx-auto p-4 pt-20">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Service Configuration</h1>
              <p className="text-muted-foreground mt-2">
                Choose which services and products you want to monitor. You'll receive notifications
                when there are incidents affecting your selected products.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Search services and products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />

              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-4">
                  {filteredServices.map((service) => (
                    <Collapsible
                      key={service.id}
                      open={expandedServices.has(service.id)}
                      onOpenChange={() => toggleService(service.id)}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full text-left">
                          <CardHeader className="p-6">
                            <div className="flex items-center justify-between">
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
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="p-0">
                            <div className="py-2 px-6">
                              <Input
                                placeholder={`Search ${service.name} products...`}
                                value={productSearchQueries[service.id] || ""}
                                onChange={(e) => handleProductSearch(service.id, e.target.value)}
                                className="w-full"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="divide-y">
                              {getFilteredProducts(service).map((product) => {
                                const isEnabled = enabledProducts.has(`${service.id}-${product.id}`);
                                return (
                                  <button
                                    key={product.id}
                                    className={cn(
                                      "w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors",
                                      isEnabled && "bg-accent/10"
                                    )}
                                    onClick={() => toggleProduct(service.id, product.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      {getIconForProduct(service.id, product.id)}
                                      <span className="font-medium">{product.name}</span>
                                    </div>
                                    {isEnabled && <Check className="h-4 w-4 text-accent" />}
                                  </button>
                                );
                              })}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
    </AppSidebar>
  );
} 