export interface Review {
  id: string;
  title: string;
  rating: number;
  text: string;
  date: string;
  image?: string[];
}

export const reviewDataRaw: Review[] = [
  {
    id: 'userId1',
    title: '훌륭한 제품',
    rating: 5,
    text: '이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요! 이 제품을 정말 좋아합니다. 추천해요!',
    date: '2023-02-01',
    image: ['/img/image02.jpg', '/img/image02.jpg', '/img/image02.jpg'],
  },
  {
    id: 'userId2',
    title: '좋지 않아요',
    rating: 1,
    text: '기대했던 것보다 품질이 떨어집니다.',
    date: '2023-04-02',
  },
  {
    id: 'userId3',
    title: '생각보다 아쉬움',
    rating: 3,
    text: '기대했던 것보다 디자인이 떨어집니다. 재구매 안할 것 같아요.',
    date: '2023-04-12',
  },
  {
    id: 'userId4',
    title: '너무 좋습니다',
    rating: 4,
    text: '사진과 같고 배송이 빨라서 만족',
    date: '2023-04-17',
  },
];
