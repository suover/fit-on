export interface Product {
  id: string;
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

export interface ProductImage {
  productId: number;
  imgURL: string;
  isMainImg: boolean;
}
