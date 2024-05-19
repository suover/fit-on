//문의사항 더미데이터

export interface Question {
  id: string;
  answer: boolean;
  content: string;
  nickname: string;
  date: string;
  isExpanded: boolean;
  answerContent?: string; // 답변 내용 @@
  answerDate?: string; // 답변 날짜
}
export const questions: Question[] = [
  {
    id: '1',
    answer: true,
    content: '재입고 언제 되나요?',
    nickname: '비둘기',
    date: '2023/02/19 07:38',
    isExpanded: false,
  },
  {
    id: '2',
    answer: true,
    content: '문의합니다. ',
    nickname: 'applelover',
    date: '2023/12/21 17:10',
    isExpanded: false,
  },
  {
    id: '3',
    answer: true,
    content:
      ' 개인 용도로 사용할 운동용 그리퍼의 성능에 대해 자세히 알고 싶습니다. 구체적인 기능과 내구성 정보를 부탁드립니다. 개인 용도로 사용할 운동용 그리퍼의 성능에 대해 자세히 알고 싶습니다. 구체적인 기능과 내구성 정보를 부탁드립니다.',
    nickname: '하니',
    date: '2024/03/11 10:30',
    isExpanded: false,
  },
  {
    id: '4',
    answer: false,
    content: '경찰 공무원 준비생인데 강도를 몇 kg으로 구매하면 될까요?',
    nickname: 'Hahaha',
    date: '2024/05/01 15:30',
    isExpanded: false,
  },
  {
    id: '5',
    answer: false,
    content: '민트 컬러 재고 있나요?',
    nickname: '미스터부',
    date: '2024/05/11 12:30',
    isExpanded: false,
  },
  {
    id: '6',
    answer: false,
    content: '운동 초보도 이용 가능할까요??',
    nickname: '버블검',
    date: '2024/05/12 19:30',
    isExpanded: false,
  },
  {
    id: '7',
    answer: false,
    content: '제조국이 어디인가요?',
    nickname: '오스트리아',
    date: '2024/05/13 11:30',
    isExpanded: false,
  },
  {
    id: '8',
    answer: false,
    content: '손이 큰 편인데 너무 작지 않은지 궁금합니다.',
    nickname: '랄프',
    date: '2024/05/13 15:30',
    isExpanded: false,
  },
  {
    id: '9',
    answer: false,
    content:
      '베스트악력기랑 무엇이 다른가요? 이미 베스트 악력기는 구매했는데..',
    nickname: '소비요정',
    date: '2024/05/13 15:33',
    isExpanded: false,
  },
];
