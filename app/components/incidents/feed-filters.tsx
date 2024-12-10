import { useState } from 'react';
import type { Incident } from '~/types/incident';

interface FilterProps {
  incidents: Incident[];
  onFilterChange: (products: string[], services: string[]) => void;
}

export function FeedFilters({ incidents, onFilterChange }: FilterProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Extract unique products and services from incidents
  const products = [...new Set(incidents.map(incident => incident.product))].sort();
  const services = [...new Set(incidents.map(incident => incident.service))].sort();

  const handleProductChange = (product: string) => {
    const updated = selectedProducts.includes(product)
      ? selectedProducts.filter(p => p !== product)
      : [...selectedProducts, product];
    setSelectedProducts(updated);
    onFilterChange(updated, selectedServices);
  };

  const handleServiceChange = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    onFilterChange(selectedProducts, updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Products</h3>
        <div className="space-y-2">
          {products.map(product => (
            <label key={product} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleProductChange(product)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{product}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Services</h3>
        <div className="space-y-2">
          {services.map(service => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedProducts.length > 0 || selectedServices.length > 0) && (
        <button
          onClick={() => {
            setSelectedProducts([]);
            setSelectedServices([]);
            onFilterChange([], []);
          }}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear filters
        </button>
      )}
    </div>
  );
} 