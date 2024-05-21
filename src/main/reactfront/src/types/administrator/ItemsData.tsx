export interface Product {
  imageUrl: string; //svg이미지 속성추가
  name: string;
  category: string;
  status: 'Active' | 'Disabled';
  id: string;
  sales: number;
  stock: number;
  price: string;
}

export const products: Product[] = [
  {
    id: '1',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: '고무밴드',
    category: '헬스용품',
    status: 'Disabled',
    sales: 11,
    stock: 36,
    price: '22,000',
  },
  {
    id: '2',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: '오메가3',
    category: '영양제',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '51,000',
  },
  {
    id: '3',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: '아연',
    category: '영양제',
    status: 'Disabled',
    sales: 11,
    stock: 36,
    price: '32,000',
  },
  {
    id: '4',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: '스트랩',
    category: '헬스용품',
    status: 'Active',
    sales: 15,
    stock: 20,
    price: '32,000',
  },
  {
    id: '5',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '6',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '23,000',
  },
  {
    id: '7',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '8',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '9',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '10',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '11',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '12',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '13',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '14',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '15',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '16',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '17',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '18',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '19',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '20',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '21',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '22',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '23',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '24',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '25',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '26',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '27',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '28',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '29',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '30',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '31',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '32',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '33',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '34',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
  {
    id: '35',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbjjZ5OBV3Ys_E0_FLYwIu72Uk9JVWC5YbA0ltiZk1yw&s',
    name: 'Ocean',
    category: 'Furniture',
    status: 'Active',
    sales: 11,
    stock: 36,
    price: '10,000',
  },
];
