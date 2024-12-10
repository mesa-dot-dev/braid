export interface Product {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  products: Product[];
} 