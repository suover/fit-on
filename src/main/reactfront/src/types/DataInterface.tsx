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
  imageUrl: string;
}

export interface ProductImage {
  productId: number;
  imgURL: string;
  isMainImg: boolean;
}

export interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  price: number;
  discountRate: number;
  name: string;
  userId: number;
}
