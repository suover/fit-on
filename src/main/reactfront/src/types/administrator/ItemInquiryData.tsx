export interface ItemInquiry {
  id: string;
  title: string;
  category: string;
  writer: string;
  status: string;
  date: string;
}
export const inquiries: ItemInquiry[] = [
  {
    id: '1',
    title: '이 상품은 언제 다시 입고되나요?',
    category: '상품',
    writer: '쇼핑매니아',
    status: '답변대기',
    date: '2024-05-09',
  },
  {
    id: '2',
    title: '할인 행사는 언제 시작되나요?',
    category: '상품',
    writer: '가격전사',
    status: '답변완료',
    date: '2024-05-09',
  },
  {
    id: '3',
    title: '이 제품의 보증 기간은 얼마인가요?',
    category: '상품',
    writer: '신상품탐험가',
    status: '답변완료',
    date: '2024-05-09',
  },
  {
    id: '4',
    title: '이 제품과 호환되는 액세서리는 무엇이 있나요?',
    category: '상품',
    writer: '액세서리러버',
    status: '답변완료',
    date: '2024-05-09',
  },
  {
    id: '5',
    title: '제품 설명서를 어디서 볼 수 있나요?',
    category: '상품',
    writer: '매뉴얼마스터',
    status: '답변대기',
    date: '2024-05-09',
  },
  {
    id: '6',
    title: '배송 시간은 평균 얼마나 걸리나요?',
    category: '상품',
    writer: '배송속도조사단',
    status: '답변대기',
    date: '2024-05-09',
  },
  {
    id: '7',
    title: '이 제품에 대한 리뷰는 어디서 볼 수 있나요?',
    category: '상품',
    writer: '리뷰어',
    status: '답변대기',
    date: '2024-05-09',
  },
  {
    id: '8',
    title: '사이즈 가이드는 어디서 확인할 수 있나요?',
    category: '상품',
    writer: '사이즈왕',
    status: '답변대기',
    date: '2024-05-09',
  },
  {
    id: '9',
    title: '이 제품의 색상 옵션은 무엇이 있나요?',
    category: '상품',
    writer: '컬러마니아',
    status: '답변대기',
    date: '2024-05-09',
  },
  {
    id: '10',
    title: '상품이 언제 재입고 될까요?',
    category: '상품',
    writer: '나는야 헬린이',
    status: '답변대기',
    date: '2024-05-09',
  },
];
