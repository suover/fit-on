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

  quantity: number;
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

export interface ProductPage<T>{
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  postcode:string;
  add1: string;
  add2:string;
}

export interface OrderInfoProps {
  src: string; // src의 타입을 string으로 명시
}
