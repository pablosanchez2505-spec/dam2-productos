export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}