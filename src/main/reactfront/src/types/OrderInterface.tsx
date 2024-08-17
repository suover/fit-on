export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  address: string;
}

export interface Product {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  deliveryFee: number;
}

export interface OrderInfoProps {
  src: string; // src의 타입을 string으로 명시
}
