export interface Product {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  stock: number;
  rating: number;
  price: number;
  tag: string[];
  sku: string;
  availabilityStatus: string;
  images: string[];
  thumbnail: string;
}
