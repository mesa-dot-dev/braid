import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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

  const toggleService = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
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
                    <div className="space-y-4">
                      {service.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{product.name}</p>
                          </div>
                          <Switch
                            checked={product.enabled}
                            onCheckedChange={() => {
                              // Implement toggle logic here
                              console.log(`Toggled ${product.name}`);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
} 