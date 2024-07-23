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

export interface ShippingAddress{
  addressId: number;
  userId: number;
  recipientName: string; // 수령자 이름
  contact: string; // 연락처
  postcode: string; // 우편번호
  address: string; // 주소
  addressDetail: string; // 상세주소
  addressName: string; // 사용자 지정 주소명칭
  isDefault: boolean; // 기본 배송지 여부
  createdAt: Date;
  updatedAt: Date;
}
