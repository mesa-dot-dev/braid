import { createFileRoute } from "@tanstack/react-router";
import { IncidentFeed } from "@/components/incidents/incident-feed";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-navbar";
import { Incident } from "@/types/incident";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, Filter } from "lucide-react";

// Mock data - replace with real API calls later
const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "GitHub/Actions: Workflow Execution Delays",
    status: "resolved",
    severity: "major",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    product: "GitHub",
    service: "Actions",
    description: "We observed elevated queue times and execution delays in GitHub Actions workflows.",
    productIcon: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  },
  {
    id: "2",
    title: "AWS/EC2: Instance Connectivity Issues",
    status: "investigating",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    product: "AWS",
    service: "EC2",
    description: "Multiple EC2 instances in us-east-1 are experiencing connectivity issues.",
    productIcon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    id: "3",
    title: "Cloudflare/API Gateway: Rate Limiting Issues",
    status: "monitoring",
    severity: "minor",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    product: "Cloudflare",
    service: "API Gateway",
    description: "Intermittent rate limiting issues affecting some API Gateway customers.",
    productIcon: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png"
  }
];

export const Route = createFileRoute("/(authed)/feed")({
  component: FeedComponent,
  loader: () => ({ breadcrumb: "System Status" }),
});

function FeedComponent() {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");

  // Extract unique products and services
  const { products, services } = useMemo(() => {
    const productsSet = new Set(mockIncidents.map(incident => incident.product));
    const servicesSet = new Set(mockIncidents.map(incident => incident.service));
    return {
      products: Array.from(productsSet),
      services: Array.from(servicesSet)
    };
  }, []);

  // Filter incidents based on selections
  const filteredIncidents = useMemo(() => {
    return mockIncidents.filter(incident => {
      const matchesProduct = selectedProducts.size === 0 || selectedProducts.has(incident.product);
      const matchesService = selectedServices.size === 0 || selectedServices.has(incident.service);
      const matchesSearch = searchQuery === "" || 
        incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesProduct && matchesService && matchesSearch;
    });
  }, [selectedProducts, selectedServices, searchQuery]);

  // Filter services based on search
  const filteredServices = useMemo(() => {
    return services.filter(service =>
      service.toLowerCase().includes(serviceSearchQuery.toLowerCase())
    );
  }, [services, serviceSearchQuery]);

  // Add products filter
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.toLowerCase().includes(productSearchQuery.toLowerCase())
    );
  }, [products, productSearchQuery]);

  const toggleProduct = (product: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(product)) {
      newSelected.delete(product);
    } else {
      newSelected.add(product);
    }
    setSelectedProducts(newSelected);
  };

  const toggleService = (service: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(service)) {
      newSelected.delete(service);
    } else {
      newSelected.add(service);
    }
    setSelectedServices(newSelected);
  };

  return (
    <AppSidebar>
      <div className="bg-background">
        <AppNavbar />
        <main className="mt-14 mx-auto max-w-7xl p-4">
          <div className="flex gap-8">
            {/* Incident Feed */}
            <div className="flex-1">
              <IncidentFeed incidents={filteredIncidents} />
            </div>

            {/* Filters Sidebar */}
            <div className="w-64 shrink-0">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4">
                  <h3 className="flex items-center gap-2 font-semibold leading-none tracking-tight">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h3>
                </div>
                <Separator />
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Search */}
                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <Input
                        id="search"
                        placeholder="Search incidents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Products */}
                    <div className="space-y-2">
                      <Label>Products</Label>
                      <Input
                        placeholder="Search products..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className="mb-2"
                      />
                      <ScrollArea className="h-[120px] rounded-md border">
                        <div className="p-2 space-y-1">
                          {filteredProducts.map((product) => (
                            <button
                              key={product}
                              onClick={() => toggleProduct(product)}
                              className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                selectedProducts.has(product) ? 'bg-accent' : ''
                              }`}
                            >
                              {product}
                              {selectedProducts.has(product) && (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Services */}
                    <div className="space-y-2">
                      <Label>Services</Label>
                      <Input
                        placeholder="Search services..."
                        value={serviceSearchQuery}
                        onChange={(e) => setServiceSearchQuery(e.target.value)}
                        className="mb-2"
                      />
                      <ScrollArea className="h-[120px] rounded-md border">
                        <div className="p-2 space-y-1">
                          {filteredServices.map((service) => (
                            <button
                              key={service}
                              onClick={() => toggleService(service)}
                              className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                selectedServices.has(service) ? 'bg-accent' : ''
                              }`}
                            >
                              {service}
                              {selectedServices.has(service) && (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Active Filters */}
                    {(selectedProducts.size > 0 || selectedServices.size > 0) && (
                      <div className="space-y-2">
                        <Label>Active Filters</Label>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(selectedProducts).map((product) => (
                            <Badge
                              key={product}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => toggleProduct(product)}
                            >
                              {product} ×
                            </Badge>
                          ))}
                          {Array.from(selectedServices).map((service) => (
                            <Badge
                              key={service}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => toggleService(service)}
                            >
                              {service} ×
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppSidebar>
  );
}