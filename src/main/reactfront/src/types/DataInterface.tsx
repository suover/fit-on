export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  content: string;
  discountRate: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}