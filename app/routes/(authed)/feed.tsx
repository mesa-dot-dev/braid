import { createFileRoute } from "@tanstack/react-router";
import { IncidentFeed } from "@/components/incidents/incident-feed";
import { AppNavbar } from "@/components/app-navbar";
import { Incident } from "@/types/incident";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, Filter } from "lucide-react";
import { getStatusMessages } from "@/server/status";

export const Route = createFileRoute("/(authed)/feed")({
  component: FeedComponent,
  loader: () => getStatusMessages(),
});

function FeedComponent() {
  const messages = Route.useLoaderData();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");

  // Extract unique products and services
  const { products, services } = useMemo(() => {
    const productsSet = new Set(messages.map(message => message.product));
    const servicesSet = new Set(messages.flatMap(message => message.affectedServices));
    return {
      products: Array.from(productsSet),
      services: Array.from(servicesSet)
    };
  }, [messages]);

  // Filter incidents based on selections
  const filteredIncidents = useMemo(() => {
    return messages.filter(message => {
      const matchesProduct = selectedProducts.size === 0 || selectedProducts.has(message.product);
      const matchesService = selectedServices.size === 0 || 
        message.affectedServices.some(service => selectedServices.has(service));
      const matchesSearch = searchQuery === "" || 
        message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesProduct && matchesService && matchesSearch;
    });
  }, [messages, selectedProducts, selectedServices, searchQuery]);

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
    <div className="bg-background min-h-screen">
      <AppNavbar />
      <main className="mx-auto max-w-7xl p-4 pt-20">
        <div className="flex gap-8">
          <div className="flex-1">
            <IncidentFeed incidents={filteredIncidents.map(message => ({
              id: message.guid,
              title: message.title,
              description: message.content,
              timestamp: message.pubDate,
              product: message.product,
              service: message.affectedServices[0] || 'Unknown',
              status: 'monitoring', // You might want to add status to your schema
              severity: 'major', // You might want to add severity to your schema
              productIcon: '' // You might want to add icon to your schema
            }))} />
          </div>

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
                            className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                              selectedProducts.has(product) ? 'bg-gray-100' : ''
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
                            className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                              selectedServices.has(service) ? 'bg-gray-100' : ''
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
  );
}