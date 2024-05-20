export interface EtcInquiry {
  id: string;
  title: string;
  writer: string;
  category: string;
  status: string;
  date: string;
}
export const etcInquiries: EtcInquiry[] = [
  {
    id: '1',
    title: '배송이 언제 쯤 도착할 예정인가요?',
    writer: '심심이',
    category: '배송',
    status: '답변대기',
    date: '2020-04-02',
  },
  {
    id: '2',
    title: '결제 방법 변경은 어떻게 하나요?',
    writer: '김철수',
    category: '결제',
    status: '답변완료',
    date: '2020-05-10',
  },
  {
    id: '3',
    title: '주문한 상품 배송지 변경 가능한가요?',
    writer: '이영희',
    category: '배송',
    status: '답변대기',
    date: '2020-06-15',
  },
  {
    id: '4',
    title: '카드 결제시 오류가 발생했습니다.',
    writer: '박준혁',
    category: '결제',
    status: '답변완료',
    date: '2020-07-22',
  },
  {
    id: '5',
    title: '배송 추적은 어떻게 하나요?',
    writer: '최민수',
    category: '배송',
    status: '답변대기',
    date: '2020-08-30',
  },
  {
    id: '6',
    title: '해외 결제는 어떻게 진행되나요?',
    writer: '정수정',
    category: '결제',
    status: '답변완료',
    date: '2020-09-05',
  },
  {
    id: '7',
    title: '결제 후 배송 기간은 얼마나 걸리나요?',
    writer: '김태영',
    category: '배송',
    status: '답변대기',
    date: '2020-10-11',
  },
  {
    id: '8',
    title: '결제 확인이 안 됩니다.',
    writer: '홍길동',
    category: '결제',
    status: '답변완료',
    date: '2020-11-20',
  },
  {
    id: '9',
    title: '배송일을 지정할 수 있나요?',
    writer: '장영실',
    category: '배송',
    status: '답변대기',
    date: '2020-12-15',
  },
  {
    id: '10',
    title: '결제 방법을 현금으로 변경할 수 있나요?',
    writer: '서경석',
    category: '결제',
    status: '답변완료',
    date: '2021-01-10',
  },
];
