import thumbnail from '../assets/img/main/loop.jpg';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import productImg1 from '../assets/img/main/product1.jpg'; // 실제 데이터 들어오면 사진 삭제
import productImg2 from '../assets/img/main/product2.jpg';
import productImg3 from '../assets/img/main/product3.jpg';

import info1 from '../assets/img/main/info/info1.png';
import info2 from '../assets/img/main/info/info2.jpg';
import info3 from '../assets/img/main/info/info3.png';
import info4 from '../assets/img/main/info/info4.jpg';
import info5 from '../assets/img/main/info/info5.jpg';
import info6 from '../assets/img/main/info/info6.png';
import info7 from '../assets/img/main/info/info7.png';
import info8 from '../assets/img/main/info/info8.jpg';
import info9 from '../assets/img/main/info/info9.jpg';

export interface PostData {
  id: number;
  title: string;
  writer: string;
  content: string;
  createDate: string;
  views: number;
  likes: number;
}

export interface InfoPost {
  id: number;
  title: string;
  nickname: string;
  content: string;
  views: number;
  likes: number;
  imageUrl: string;
}

export interface RoutineData {
  id: number;
  userId: string;
  title: string;
  diet: string;
  exerciseType: string;
  hours: number;
  targetArea: string;
  likes: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  description: string;
  sales: number;
  likes: number;
  imageUrl: string;
}

export interface FaqData {
  faqNum: number;
  question: string;
  answer: string;
}

export interface ServiceData {
  id: number;
  title: string;
  content: string;
  createDate: string;
  writer: string;
  views: number;
}

export interface Inquiry {
  id: number;
  state: string;
  category: string;
  title: string;
  question: string;
  writer: string;
  answer: string;
  createDate: string;
}

export const posts: PostData[] = [
  // 더미 데이터, 실제 데이터로 교체해야 함
  {
    id: 107,
    title: '운동하는 사람들을 위한 제로 펩시 핫딜 정보 공유',
    writer: '제로펩시킹',
    content: '',
    likes: 1,
    views: 4,
    createDate: '2024. 5. 30.',
  },
  {
    id: 106,
    title: '공부하느라 시간 없지만 오운완입니다.',
    writer: '오징어땅콩',
    content: '',
    likes: 2,
    views: 7,
    createDate: '2024. 5. 30.',
  },
  {
    id: 105,
    title: '러닝 크루 모집합니다.',
    writer: '올때메로나',
    content: '',
    likes: 7,
    views: 10,
    createDate: '2024. 5. 30.',
  },
  {
    id: 104,
    title: '근육이 놀란거 같은데 한의원 가면 될까요?',
    writer: '소금빵러버',
    content: '',
    likes: 1,
    views: 10,
    createDate: '2024. 5. 28.',
  },
  {
    id: 103,
    title: '운동과 휴식의 균형',
    writer: '초록나무',
    content: '',
    likes: 3,
    views: 5,
    createDate: '2024. 5. 15.',
  },
  {
    id: 102,
    title: '효과적인 스트레칭 방법',
    writer: '푸른하늘',
    content: '',
    likes: 6,
    views: 10,
    createDate: '2024. 5. 14.',
  },
  {
    id: 101,
    title: '운동 동기 부여',
    writer: '보라빛달',
    content: '',
    likes: 3,
    views: 6,
    createDate: '2024. 5. 13.',
  },
  {
    id: 100,
    title: '영양 관리의 중요성',
    writer: '노란햇살',
    content: '',
    likes: 5,
    views: 6,
    createDate: '2024. 5. 12.',
  },
  {
    id: 99,
    title: '새로운 운동 루틴 괜찮나요?? 평가좀',
    writer: '빨간장미',
    content: '',
    likes: 9,
    views: 27,
    createDate: '2024. 5. 11.',
  },
  {
    id: 98,
    title: '전신 운동 추천',
    writer: '주황코끼리',
    content: '',
    likes: 6,
    views: 10,
    createDate: '2024. 5. 8.',
  },
  // 더 많은 글을 추가할 수 있습니다.
];

export const InfoPosts: InfoPost[] = [
  {
    id: 1,
    title: '고혈압이 있다면? :: 고혈압 환자 운동시 주의사항',
    nickname: 'admin',
    content:
      '이 전신 운동 프로그램은 초보자를 위해 설계되었으며, 모든 주요 근육 그룹을 대상으로 하는 기본 운동들을 포함하고 있습니다. 자세한 가이드를 따라 시작해 보세요!',
    views: 7,
    likes: 14,
    imageUrl: info2,
  },
  {
    id: 2,
    title: '스포츠심리학 : 최고의 멘탈 조성을 위한 일반적 지침',
    nickname: 'admin',
    content:
      '유연성을 향상시키고 스트레스를 줄이기 위해 매일 짧은 요가 루틴을 생활에 통합해보세요. 바쁜 일정에도 완벽한 10분 세션입니다.',
    views: 11,
    likes: 17,
    imageUrl: info7,
  },
  {
    id: 3,
    title: '신체활동 저하로 인해 생기는 변화와 신체활동의 중요성',
    nickname: 'admin',
    content:
      '척추 건강을 위한 스트레칭 방법을 소개합니다. 규칙적으로 실행하여 등 건강을 유지하고 통증을 예방하세요.',
    views: 12,
    likes: 12,
    imageUrl: info9,
  },
  {
    id: 4,
    title: '100세시대 건강하게 장수하자! 앉아서 하는 전신운동',
    nickname: 'admin',
    content:
      '심장 건강을 향상시킬 수 있는 유산소 운동을 소개합니다. 간단한 단계를 따라하면서 건강을 관리하세요.',
    views: 13,
    likes: 15,
    imageUrl: info4,
  },
  {
    id: 5,
    title: '어린이 비만 걱정하지 마세요, 줄넘기로 해결돼요.',
    nickname: 'admin',
    content:
      '집에서 간단한 도구를 사용하여 팔 근력을 강화할 수 있는 운동 방법을 배워보세요. 몇 가지 운동만으로도 효과를 볼 수 있습니다.',
    views: 16,
    likes: 19,
    imageUrl: info5,
  },
  {
    id: 6,
    title: '잘 못된 다이어트 식단, 탈모 유발의 원인?!',
    nickname: 'admin',
    content:
      '다리와 엉덩이 근육을 강화하는 최고의 운동을 소개합니다. 이 운동들로 더욱 단단하고 건강한 하체를 만드세요.',
    views: 20,
    likes: 20,
    imageUrl: info1,
  },
  {
    id: 7,
    title: '감기 걸렸을 때 운동해도 될까요?',
    nickname: 'admin',
    content:
      '중급자를 위한 좀 더 도전적인 피트니스 루틴을 전문가의 도움으로 진행해보세요. 각 운동의 효과를 극대화하는 팁도 배울 수 있습니다.',
    views: 21,
    likes: 11,
    imageUrl: info6,
  },
  {
    id: 8,
    title: '콜레스테롤 잡는 3가지 관리 방법 :: 식이, 약, 운동',
    nickname: 'admin',
    content:
      '어린이의 체력을 증진시킬 수 있는 즐거운 체육 활동을 소개합니다. 안전하면서도 재미있는 운동으로 아이들의 건강을 지켜주세요.',
    views: 24,
    likes: 7,
    imageUrl: info3,
  },
  {
    id: 9,
    title: '거북목&굽은등 교정방법',
    nickname: 'admin',
    content:
      '노년기의 건강을 유지하고 증진시킬 수 있는 운동을 소개합니다. 부담 없이 할 수 있는 운동으로 활력을 느껴보세요.',
    views: 29,
    likes: 16,
    imageUrl: 'https://fiton-bucket.s3.ap-northeast-2.amazonaws.com/info/cdeafe1c-b212-4477-a3ff-91681ed13873-%EA%B1%B0%EB%B6%81%EB%AA%A9.jpg',
  },
  // 더 많은 글을 추가할 수 있습니다.
];

export const routines: RoutineData[] = [
  {
    id: 1,
    title: '가슴 루틴 공유',
    userId: '가슴중독자',
    diet: '저탄고지',
    exerciseType: '웨이트 트레이닝',
    hours: 0.5,
    targetArea: '상체',
    likes: 112,
  },
  {
    id: 2,
    title: '대구 앞산 산행코스',
    userId: '대구 엄홍길',
    diet: '고단백',
    exerciseType: '등산',
    hours: 1.5,
    targetArea: '전신',
    likes: 56,
  },
  {
    id: 3,
    userId: '달서구왕팔',
    title: '저의 팔 루틴을 공유합니다.',
    diet: '고단백',
    exerciseType: '웨이트 트레이닝',
    hours: 1.5,
    targetArea: '전신',
    likes: 22,
  },
  // 추가 루틴 데이터
];

export const products: { [key: string]: Product[] } = {
  운동용품: [
    {
      id: 21,
      name: '컬러 풀업 밴드',
      price: 12500,
      discountRate: 8,
      description: '컬러감이 예쁜 풀업 밴드',
      sales: 300,
      likes: 150,
      imageUrl: product1,
    },
    {
      id: 22,
      name: '실내용 스텝퍼',
      price: 53900,
      discountRate: 5,
      description: '화사한 컬러의 스텝퍼',
      sales: 250,
      likes: 125,
      imageUrl: product2,
    },
    {
      id: 23,
      name: '필라테스 써클링',
      price: 12000,
      discountRate: 5,
      description: '집에서도 할 수 있는 다양한 무게의 덤벨 세트',
      sales: 200,
      likes: 100,
      imageUrl: product3,
    },
    {
      id: 24,
      name: '필라테스 토닝볼',
      price: 16100,
      discountRate: 5,
      description: '가벼운 토닝볼 근력 운동',
      sales: 220,
      likes: 110,
      imageUrl: product4,
    },
    {
      id: 25,
      name: '트레드밀',
      price: 120000,
      discountRate: 25,
      description: '집에서 사용하기 좋은 고성능 트레드밀',
      sales: 80,
      likes: 40,
      imageUrl: productImg2,
    },
    {
      id: 26,
      name: '헬스 볼',
      price: 35000,
      discountRate: 7,
      description: '균형 감각과 코어 근육 강화에 좋은 헬스 볼',
      sales: 150,
      likes: 75,
      imageUrl: productImg2,
    },
    {
      id: 27,
      name: '레지스턴스 밴드',
      price: 20000,
      discountRate: 12,
      description: '모든 부위 운동에 사용 가능한 레지스턴스 밴드',
      sales: 170,
      likes: 85,
      imageUrl: productImg2,
    },
    {
      id: 28,
      name: '벤치 프레스',
      price: 85000,
      discountRate: 18,
      description: '가정용 강화된 벤치 프레스',
      sales: 60,
      likes: 30,
      imageUrl: productImg2,
    },
    {
      id: 29,
      name: '스피닝 바이크',
      price: 110000,
      discountRate: 22,
      description: '실내에서 즐기는 사이클링 스피닝 바이크',
      sales: 40,
      likes: 20,
      imageUrl: productImg2,
    },
    {
      id: 30,
      name: '핸드 그립',
      price: 8000,
      discountRate: 9,
      description: '손목과 팔의 힘을 키우는 핸드 그립',
      sales: 90,
      likes: 45,
      imageUrl: productImg2,
    },
  ],
  영양제: [
    {
      id: 11,
      name: '비타민 C 1000',
      price: 15000,
      discountRate: 10,
      description: '면역력 강화에 도움을 주는 비타민 C',
      sales: 200,
      likes: 100,
      imageUrl: productImg1,
    },
    {
      id: 12,
      name: '오메가 3',
      price: 17000,
      discountRate: 20,
      description: '심혈관 건강에 좋은 오메가 3',
      sales: 180,
      likes: 90,
      imageUrl: productImg1,
    },
    {
      id: 13,
      name: '멀티 비타민',
      price: 13000,
      discountRate: 15,
      description: '모든 필수 비타민을 한 번에',
      sales: 220,
      likes: 110,
      imageUrl: productImg1,
    },
    {
      id: 14,
      name: '마그네슘',
      price: 12000,
      discountRate: 5,
      description: '근육과 신경 기능 강화에 효과적',
      sales: 150,
      likes: 75,
      imageUrl: productImg1,
    },
    {
      id: 15,
      name: '철분 보충제',
      price: 16000,
      discountRate: 12,
      description: '철분 결핍 예방에 도움을 주는 철분 보충제',
      sales: 140,
      likes: 70,
      imageUrl: productImg1,
    },
    {
      id: 16,
      name: '칼슘 + D',
      price: 19000,
      discountRate: 7,
      description: '뼈 건강에 필수적인 칼슘과 비타민 D',
      sales: 160,
      likes: 80,
      imageUrl: productImg1,
    },
    {
      id: 17,
      name: '프로바이오틱스',
      price: 18000,
      discountRate: 9,
      description: '장 건강과 면역력 강화에 도움을 주는 프로바이오틱스',
      sales: 130,
      likes: 65,
      imageUrl: productImg1,
    },
    {
      id: 18,
      name: '아연 보충제',
      price: 14000,
      discountRate: 18,
      description: '면역력 강화와 상처 치유를 돕는 아연',
      sales: 120,
      likes: 60,
      imageUrl: productImg1,
    },
    {
      id: 19,
      name: '셀레늄',
      price: 20000,
      discountRate: 22,
      description: '항산화 작용을 하는 셀레늄',
      sales: 110,
      likes: 55,
      imageUrl: productImg1,
    },
    {
      id: 20,
      name: '글루코사민',
      price: 21000,
      discountRate: 25,
      description: '관절 건강을 지원하는 글루코사민',
      sales: 100,
      likes: 50,
      imageUrl: productImg1,
    },
  ],
  보충제: [
    {
      id: 1,
      name: '프로틴 파우더',
      price: 20000,
      discountRate: 10,
      description: '근육 회복을 돕는 최상의 프로틴 파우더',
      sales: 150,
      likes: 75,
      imageUrl: productImg3,
    },
    {
      id: 2,
      name: '휠 피니시 프로틴',
      price: 22000,
      discountRate: 15,
      description: '운동 후 빠른 회복을 위한 프로틴',
      sales: 80,
      likes: 45,
      imageUrl: productImg3,
    },
    {
      id: 3,
      name: '리커버리 프로틴',
      price: 24000,
      discountRate: 5,
      description: '운동 후 손상된 근육 회복에 탁월',
      sales: 200,
      likes: 150,
      imageUrl: productImg3,
    },
    {
      id: 4,
      name: '나이트 프로틴',
      price: 26000,
      discountRate: 20,
      description: '수면 중에도 근육을 보호',
      sales: 60,
      likes: 30,
      imageUrl: productImg3,
    },
    {
      id: 5,
      name: '모닝 리프트 프로틴',
      price: 18000,
      discountRate: 25,
      description: '아침 운동의 최적 파트너',
      sales: 90,
      likes: 55,
      imageUrl: productImg3,
    },
    {
      id: 6,
      name: '이소퓨어 프로틴',
      price: 28000,
      discountRate: 7,
      description: '순수 단백질로 구성된 프로틴',
      sales: 40,
      likes: 25,
      imageUrl: productImg3,
    },
    {
      id: 7,
      name: '파워 프로틴',
      price: 30000,
      discountRate: 12,
      description: '전문가용 고단백 보충제',
      sales: 120,
      likes: 65,
      imageUrl: productImg3,
    },
    {
      id: 8,
      name: '디톡스 프로틴',
      price: 21000,
      discountRate: 18,
      description: '독소 배출에 효과적인 프로틴',
      sales: 70,
      likes: 35,
      imageUrl: productImg3,
    },
    {
      id: 9,
      name: '벌크업 프로틴',
      price: 19000,
      discountRate: 22,
      description: '체중 증가를 돕는 고칼로리 프로틴',
      sales: 160,
      likes: 85,
      imageUrl: productImg3,
    },
    {
      id: 10,
      name: '슬림다운 프로틴',
      price: 23000,
      discountRate: 9,
      description: '체지방 감소를 위한 프로틴',
      sales: 140,
      likes: 70,
      imageUrl: productImg3,
    },
  ],
};

export const notices: ServiceData[] = [
  {
    id: 1,
    title: '2024년 신년 이벤트 공지',
    content:
      '2024년을 맞아 새해 이벤트를 개최합니다. 이벤트에 참여하고 다양한 경품을 받아보세요.',
    createDate: '2024-01-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 2,
    title: '시스템 점검 안내',
    content:
      '시스템 점검으로 인해 5월 15일에 일시적인 서비스 중단이 예정되어 있습니다. 불편을 드려 죄송합니다.',
    createDate: '2024-05-10',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 3,
    title: '고객센터 운영시간 변경',
    content:
      '고객센터 운영시간이 6월 1일부터 변경됩니다. 월-금 오전 9시부터 오후 6시까지 운영됩니다.',
    createDate: '2024-06-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 4,
    title: '서비스 이용 약관 개정',
    content:
      '서비스 이용 약관이 7월 1일부로 변경됩니다. 변경된 약관을 확인하시고 불편이 없도록 해주시기 바랍니다.',
    createDate: '2024-07-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 5,
    title: '회원 등급 제도 개편 안내',
    content:
      '회원 등급 제도가 개편되었습니다. 변경된 등급에 따른 혜택을 확인하세요.',
    createDate: '2024-08-15',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 6,
    title: '여름 휴가철 배송 일정',
    content:
      '여름 휴가철을 맞이하여 8월 1일부터 8월 10일까지 배송 일정이 다소 변경될 수 있습니다.',
    createDate: '2024-08-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 7,
    title: '신제품 출시 안내',
    content:
      '새로운 제품 라인업이 곧 출시됩니다. 자세한 내용은 신제품 출시 이벤트에서 확인하세요.',
    createDate: '2024-09-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 8,
    title: '리워드 프로그램 업데이트',
    content:
      '리워드 프로그램이 업데이트되어 더 많은 포인트를 적립할 수 있게 되었습니다.',
    createDate: '2024-09-15',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 9,
    title: '할인 프로모션 공지',
    content:
      '할인 프로모션을 통해 인기 상품을 할인된 가격에 만나보세요. 기간 한정 이벤트입니다.',
    createDate: '2024-10-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 10,
    title: '가을 정기점검 안내',
    content:
      '가을 정기점검으로 인해 10월 20일에 서비스가 일시 중단됩니다. 양해 부탁드립니다.',
    createDate: '2024-10-20',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 11,
    title: '연말 감사 이벤트',
    content:
      '올 한해 성원에 감사드리며 연말 감사 이벤트를 진행합니다. 많은 참여 부탁드립니다.',
    createDate: '2024-12-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 12,
    title: '택배 서비스 지연 안내',
    content:
      '연말 물량 증가로 인해 택배 서비스가 지연될 수 있습니다. 너그러운 양해 부탁드립니다.',
    createDate: '2024-12-20',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 13,
    title: '봄맞이 할인 이벤트',
    content:
      '봄을 맞아 인기 상품에 대한 할인 이벤트를 진행합니다. 기회를 놓치지 마세요!',
    createDate: '2025-03-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 14,
    title: '개인정보 처리방침 변경',
    content:
      '개인정보 처리방침이 4월 1일부로 변경됩니다. 변경된 방침을 꼭 확인해주세요.',
    createDate: '2025-04-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 15,
    title: '재고 관리 시스템 업그레이드',
    content:
      '효율적인 재고 관리를 위해 재고 관리 시스템이 업그레이드됩니다. 이로 인해 일시적으로 서비스에 영향이 있을 수 있습니다.',
    createDate: '2025-04-15',
    views: 1000,
    writer: 'FITON',
  },
];

export const events: ServiceData[] = [
  {
    id: 1,
    title: '봄맞이 세일 이벤트',
    content:
      '다가오는 봄을 맞이하여 모든 상품에 최대 30% 할인된 가격으로 만나보세요.',
    createDate: '2024-03-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 2,
    title: '신상품 출시 기념 이벤트',
    content: '신상품 출시 기념으로 구매 시 사은품을 증정합니다.',
    createDate: '2024-04-10',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 3,
    title: '무료 배송 이벤트',
    content: '특정 금액 이상 구매 시 무료 배송 혜택을 받아보세요.',
    createDate: '2024-05-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 4,
    title: '여름 맞이 특가 이벤트',
    content: '여름 시즌을 맞아 다양한 상품을 특가로 제공합니다.',
    createDate: '2024-06-15',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 5,
    title: '정기 회원 감사 이벤트',
    content: '정기 회원을 위한 특별한 할인 혜택과 쿠폰을 제공합니다.',
    createDate: '2024-07-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 6,
    title: '회원 등급별 리워드 이벤트',
    content: '회원 등급에 따라 적립금이나 포인트를 증정합니다.',
    createDate: '2024-08-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 7,
    title: '가을 프로모션 이벤트',
    content: '가을을 맞이하여 다양한 가을 상품에 할인 혜택을 적용합니다.',
    createDate: '2024-09-15',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 8,
    title: '추석 기념 사은품 이벤트',
    content: '추석을 기념하여 일정 금액 이상 구매 시 사은품을 증정합니다.',
    createDate: '2024-09-30',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 9,
    title: '할로윈 이벤트',
    content: '할로윈을 맞아 재미있는 이벤트와 선물을 준비했습니다.',
    createDate: '2024-10-31',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 10,
    title: '블랙프라이데이 할인 이벤트',
    content: '블랙프라이데이 세일로 인기 상품을 특별한 가격에 구매하세요.',
    createDate: '2024-11-25',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 11,
    title: '크리스마스 선물 이벤트',
    content: '크리스마스 시즌에 맞춰 다양한 선물 아이디어를 만나보세요.',
    createDate: '2024-12-15',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 12,
    title: '연말정산 혜택 이벤트',
    content: '연말정산을 대비한 특별한 혜택을 제공해 드립니다.',
    createDate: '2024-12-31',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 13,
    title: '신년 맞이 이벤트',
    content: '새해를 맞아 다양한 상품과 함께 특별한 혜택을 누리세요.',
    createDate: '2025-01-10',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 14,
    title: '설맞이 세일 이벤트',
    content: '설을 맞아 특별한 할인 이벤트를 진행합니다.',
    createDate: '2025-02-01',
    views: 1000,
    writer: 'FITON',
  },
  {
    id: 15,
    title: '봄맞이 여행 이벤트',
    content:
      '봄을 맞아 여행 상품을 구매하시는 분들에게 특별한 혜택을 드립니다.',
    createDate: '2025-03-15',
    views: 1000,
    writer: 'FITON',
  },
];

export const faqs: FaqData[] = [
  {
    faqNum: 1,
    question: '주문한 제품은 언제 배송되나요?',
    answer:
      '주문하신 제품은 결제 완료 후 일반적으로 2~3일 내에 배송됩니다. 배송 상황에 따라 다소 차이가 발생할 수 있습니다.',
  },
  {
    faqNum: 2,
    question: '반품 절차는 어떻게 되나요?',
    answer:
      '제품 수령 후 14일 이내에 반품 요청이 가능합니다. 반품 신청을 하시면 자세한 절차와 방법을 안내해드립니다.',
  },
  {
    faqNum: 3,
    question: '교환하고 싶은데 어떻게 해야 하나요?',
    answer:
      '교환을 원하실 경우, 제품을 수령한 후 7일 이내에 고객센터로 연락주세요. 재고 상황에 따라 교환 가능 여부가 결정됩니다.',
  },
  {
    faqNum: 4,
    question: '결제 방법에는 어떤 것들이 있나요?',
    answer:
      '신용카드, 직불카드, 계좌이체, 그리고 페이팔을 포함한 다양한 결제 수단을 제공합니다.',
  },
  {
    faqNum: 5,
    question: '현금 영수증은 어떻게 발급받나요?',
    answer:
      '주문 시 결제 페이지에서 현금 영수증 발급을 요청하실 수 있으며, 주문 완료 후 고객센터를 통해서도 발급 요청이 가능합니다.',
  },
  {
    faqNum: 6,
    question: '회원가입 없이도 주문할 수 있나요?',
    answer:
      "네, 회원가입을 하지 않고도 '손님 주문' 옵션을 통해 구매하실 수 있습니다. 다만, 회원가입을 하시면 더 많은 혜택을 받으실 수 있습니다.",
  },
  {
    faqNum: 7,
    question: '회원 정보를 변경하고 싶어요.',
    answer:
      "로그인 후 '내 정보' 섹션에서 언제든지 회원 정보를 수정할 수 있습니다.",
  },
  {
    faqNum: 8,
    question: '아이디/비밀번호를 잊어버렸어요. 어떻게 해야 하나요?',
    answer:
      "로그인 페이지에서 '아이디/비밀번호 찾기'를 클릭하시고 등록하신 이메일 주소를 입력하시면, 해당 이메일로 재설정 링크를 보내드립니다.",
  },
  {
    faqNum: 9,
    question: '할인코드는 어떻게 사용하나요?',
    answer:
      "결제 시 '할인 코드 입력' 필드에 코드를 입력하시면 할인이 적용됩니다. 각 코드는 사용 조건이 상이하므로 상세 설명을 확인해주세요.",
  },
  {
    faqNum: 10,
    question: '제품의 재고가 없을 때는 어떻게 하나요?',
    answer:
      "재고가 없는 제품의 경우, 제품 페이지에서 '재입고 알림 받기' 옵션을 선택하시면 재입고 시 이메일로 알림을 드립니다.",
  },
];

export const inquiries: Inquiry[] = [
  {
    id: 1,
    state: '답변완료',
    category: '배송',
    title: '배송 지연 문의',
    question:
      '상품 배송이 예상일보다 지연되고 있습니다. 언제 도착할지 알 수 있을까요?',
    writer: 'someone',
    createDate: '2024-05-01',
    answer:
      '상품의 배송 상태를 확인 후 고객님께 개별적으로 연락 드리겠습니다. 불편을 드려 죄송합니다.',
  },
  {
    id: 2,
    state: '답변완료',
    category: '환불',
    title: '환불 처리 문의',
    question: '환불 처리 진행 상황을 알고 싶습니다.',
    writer: 'someone',
    createDate: '2024-05-03',
    answer:
      '고객님의 환불 요청이 접수되었으며, 처리 예정일은 다음 주 월요일입니다.',
  },
  {
    id: 3,
    state: '답변완료',
    category: '제품',
    title: '제품 하자 문의',
    question: '받은 제품에 결함이 있습니다. 교환이 가능한지 문의드립니다.',
    writer: 'someone',
    createDate: '2024-05-05',
    answer:
      '제품 결함과 관련하여 교환 절차를 안내해드리겠습니다. 제품을 보내주시면 검토 후 조치를 취해드립니다.',
  },
  {
    id: 4,
    state: '답변완료',
    category: '계정',
    title: '비밀번호 변경 문의',
    question: '비밀번호를 변경하고 싶습니다. 방법을 알려주세요.',
    writer: 'someone',
    createDate: '2024-05-07',
    answer:
      '비밀번호 변경은 고객센터 홈페이지의 "계정 설정"에서 가능합니다. 절차에 따라 변경해 주세요.',
  },
  {
    id: 5,
    state: '답변완료',
    category: '교환',
    title: '교환 신청 방법',
    question: '교환을 신청하는 방법을 알려주세요.',
    writer: 'someone',
    createDate: '2024-05-09',
    answer:
      '교환 신청은 온라인 포털을 통해 접수 가능합니다. 제품 페이지 또는 고객센터를 이용해 주세요.',
  },
  {
    id: 6,
    state: '답변완료',
    category: '배송',
    title: '배송 추적 오류',
    question: '배송 추적 정보가 잘못 표시됩니다. 확인 부탁드립니다.',
    writer: 'someone',
    createDate: '2024-05-02',
    answer:
      '배송 정보가 업데이트되는 데 시간이 걸릴 수 있습니다. 최신 정보를 확인 후 다시 연락드리겠습니다.',
  },
  {
    id: 7,
    state: '답변완료',
    category: '환불',
    title: '환불 소요 기간',
    question: '환불이 완료되는데 얼마나 걸리나요?',
    writer: 'someone',
    createDate: '2024-05-04',
    answer: '환불 처리는 신청 후 최대 7일 이내에 완료될 예정입니다.',
  },
  {
    id: 8,
    state: '답변완료',
    category: '제품',
    title: '제품 사용 방법',
    question: '제품 사용 방법을 알고 싶습니다.',
    writer: 'someone',
    createDate: '2024-05-06',
    answer:
      '제품 사용 설명서를 통해 자세한 내용을 확인할 수 있습니다. 고객센터에서 요청 가능합니다.',
  },
  {
    id: 9,
    state: '답변완료',
    category: '교환',
    title: '교환 시 비용 문의',
    question: '교환 시 추가 비용이 발생하나요?',
    writer: 'someone',
    createDate: '2024-05-10',
    answer:
      '교환 시 별도의 비용은 발생하지 않으며, 운송비는 당사에서 부담합니다.',
  },
  {
    id: 10,
    state: '답변완료',
    category: '계정',
    title: '계정 잠금 해제',
    question: '계정이 잠겨서 접속할 수 없습니다. 해결 방법이 있나요?',
    writer: 'someone',
    createDate: '2024-05-12',
    answer:
      '고객님의 계정 잠금 해제 요청을 확인했습니다. 확인된 정보로 연락드리겠습니다.',
  },
  {
    id: 11,
    state: '답변완료',
    category: '배송',
    title: '배송 취소 방법',
    question: '배송 중인 상품을 취소할 수 있나요?',
    writer: 'someone',
    createDate: '2024-05-08',
    answer: '상품 배송이 시작되면 취소가 어렵습니다. 고객센터로 문의해 주세요.',
  },
  {
    id: 12,
    state: '답변완료',
    category: '제품',
    title: '제품 명세서 요청',
    question: '제품의 자세한 명세서를 받을 수 있을까요?',
    writer: 'someone',
    createDate: '2024-05-11',
    answer: '제품 페이지나 고객센터에서 제품 명세서를 요청하실 수 있습니다.',
  },
  {
    id: 13,
    state: '답변완료',
    category: '계정',
    title: '계정 생성 문제',
    question: '새 계정을 생성할 수 없습니다. 오류가 발생하는지 확인해 주세요.',
    writer: 'someone',
    createDate: '2024-05-13',
    answer:
      '계정 생성 문제는 서버 문제일 수 있습니다. 자세한 내용은 고객센터로 문의해 주세요.',
  },
  {
    id: 14,
    state: '답변완료',
    category: '환불',
    title: '환불 요청 취소',
    question: '환불 요청을 취소할 수 있나요?',
    writer: 'someone',
    createDate: '2024-05-14',
    answer: '환불 요청 취소는 고객센터에 문의하여 처리할 수 있습니다.',
  },
  {
    id: 15,
    state: '답변완료',
    category: '교환',
    title: '교환 후 환불 가능 여부',
    question: '교환 후에 환불이 가능한지 궁금합니다.',
    writer: 'someone',
    createDate: '2024-05-15',
    answer:
      '교환 후 환불은 불가능하며, 자세한 내용은 고객센터로 문의해 주세요.',
  },
];
