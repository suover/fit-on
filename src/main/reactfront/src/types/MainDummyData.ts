import thumbnail from './assets/loop.jpg';
import productImg1 from './assets/product1.jpg'; // 실제 데이터 들어오면 사진 삭제
import productImg2 from './assets/product2.jpg';
import productImg3 from './assets/product3.jpg';

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
  author: string;
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

export interface Comment {
  id: number;
  userId: string;
  content: string;
  writtenTime: string;
  likes: number;
  createdDate: string;
  updatedData: string;
  replies: Comment[];
}

export const posts: PostData[] = [
  // 더미 데이터, 실제 데이터로 교체해야 함
  {
    id: 1,
    title: '첫 번째 글',
    writer: 'someone',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales hendrerit interdum. Phasellus fringilla lorem lorem, vel tristique massa rhoncus sit amet. Nam aliquam molestie lacus, quis lobortis diam maximus vel. ',
    createDate: new Date().toISOString(),
    views: 1679,
    likes: 1500,
  },
  {
    id: 2,
    title: '두 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 3,
    title: '세 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 4,
    title: '네 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 5,
    title: '다섯 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 6,
    title: '여섯 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 7,
    title: '일곱 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 8,
    title: '여덟 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 9,
    title: '아홉 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  {
    id: 10,
    title: '열 번째 글',
    writer: 'someone',
    content:
      'Maecenas dapibus ornare ante tincidunt euismod. Phasellus nunc eros, vehicula nec quam et, semper posuere mi. Nunc odio ante, porta pellentesque suscipit a, dapibus laoreet dui.',
    createDate: new Date().toISOString(),
    views: 1579,
    likes: 1200,
  },
  // 더 많은 글을 추가할 수 있습니다.
];

export const InfoPosts: InfoPost[] = [
  {
    id: 1,
    title: '초보자를 위한 전신 운동 가이드',
    author: '김진수',
    content:
      '이 전신 운동 프로그램은 초보자를 위해 설계되었으며, 모든 주요 근육 그룹을 대상으로 하는 기본 운동들을 포함하고 있습니다. 자세한 가이드를 따라 시작해 보세요!',
    views: 150,
    likes: 10,
    imageUrl: thumbnail,
  },
  {
    id: 2,
    title: '매일 10분 요가 루틴',
    author: '박소연',
    content:
      '유연성을 향상시키고 스트레스를 줄이기 위해 매일 짧은 요가 루틴을 생활에 통합해보세요. 바쁜 일정에도 완벽한 10분 세션입니다.',
    views: 235,
    likes: 15,
    imageUrl: thumbnail,
  },
  {
    id: 3,
    title: '건강한 척추를 위한 스트레칭',
    author: '이민호',
    content:
      '척추 건강을 위한 스트레칭 방법을 소개합니다. 규칙적으로 실행하여 등 건강을 유지하고 통증을 예방하세요.',
    views: 300,
    likes: 25,
    imageUrl: thumbnail,
  },
  {
    id: 4,
    title: '심장 강화를 위한 유산소 운동',
    author: '정하나',
    content:
      '심장 건강을 향상시킬 수 있는 유산소 운동을 소개합니다. 간단한 단계를 따라하면서 건강을 관리하세요.',
    views: 410,
    likes: 35,
    imageUrl: thumbnail,
  },
  {
    id: 5,
    title: '집에서 할 수 있는 팔 근력 강화 운동',
    author: '최영철',
    content:
      '집에서 간단한 도구를 사용하여 팔 근력을 강화할 수 있는 운동 방법을 배워보세요. 몇 가지 운동만으로도 효과를 볼 수 있습니다.',
    views: 120,
    likes: 5,
    imageUrl: thumbnail,
  },
  {
    id: 6,
    title: '다리와 엉덩이를 위한 최고의 운동',
    author: '한지민',
    content:
      '다리와 엉덩이 근육을 강화하는 최고의 운동을 소개합니다. 이 운동들로 더욱 단단하고 건강한 하체를 만드세요.',
    views: 500,
    likes: 45,
    imageUrl: thumbnail,
  },
  {
    id: 7,
    title: '전문가와 함께하는 중급자를 위한 피트니스 루틴',
    author: '박지성',
    content:
      '중급자를 위한 좀 더 도전적인 피트니스 루틴을 전문가의 도움으로 진행해보세요. 각 운동의 효과를 극대화하는 팁도 배울 수 있습니다.',
    views: 620,
    likes: 50,
    imageUrl: thumbnail,
  },
  {
    id: 8,
    title: '어린이를 위한 즐거운 체육 활동',
    author: '김태희',
    content:
      '어린이의 체력을 증진시킬 수 있는 즐거운 체육 활동을 소개합니다. 안전하면서도 재미있는 운동으로 아이들의 건강을 지켜주세요.',
    views: 280,
    likes: 20,
    imageUrl: thumbnail,
  },
  {
    id: 9,
    title: '노인을 위한 건강 운동',
    author: '서현진',
    content:
      '노년기의 건강을 유지하고 증진시킬 수 있는 운동을 소개합니다. 부담 없이 할 수 있는 운동으로 활력을 느껴보세요.',
    views: 350,
    likes: 30,
    imageUrl: thumbnail,
  },
  {
    id: 10,
    title: '평화로운 명상과 마인드풀니스',
    author: '조미경',
    content:
      '마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.',
    views: 410,
    likes: 40,
    imageUrl: thumbnail,
  },
  // 더 많은 글을 추가할 수 있습니다.
];

export const routines: RoutineData[] = [
  {
    id: 1,
    title: '저탄고지랑 웨이트!',
    userId: 'user123',
    diet: '저탄고지',
    exerciseType: '웨이트 트레이닝',
    hours: 2,
    targetArea: '상체',
    likes: 1500,
  },
  {
    id: 2,
    title: '단백하게 크로스핏',
    userId: 'fitnessPro',
    diet: '고단백',
    exerciseType: '크로스핏',
    hours: 1.5,
    targetArea: '전신',
    likes: 1200,
  },
  {
    id: 3,
    userId: 'fitnessPro',
    title: '단백하게 크로스핏 제목이 길다면 제목이 길다면 제목이 길다면',
    diet: '고단백',
    exerciseType: '크로스핏',
    hours: 1.5,
    targetArea: '전신',
    likes: 1200,
  },
  // 추가 루틴 데이터
];

export const products: { [key: string]: Product[] } = {
  운동용품: [
    {
      id: 21,
      name: '점프 로프',
      price: 5000,
      discountRate: 10,
      description: '칼로리 소모에 효과적인 점프 로프',
      sales: 300,
      likes: 150,
      imageUrl: productImg2,
    },
    {
      id: 22,
      name: '요가 매트',
      price: 25000,
      discountRate: 15,
      description: '프리미엄 안티슬립 요가 매트',
      sales: 250,
      likes: 125,
      imageUrl: productImg2,
    },
    {
      id: 23,
      name: '덤벨 세트',
      price: 45000,
      discountRate: 5,
      description: '집에서도 할 수 있는 다양한 무게의 덤벨 세트',
      sales: 200,
      likes: 100,
      imageUrl: productImg2,
    },
    {
      id: 24,
      name: '풀업 바',
      price: 15000,
      discountRate: 20,
      description: '문에 설치 가능한 풀업 바',
      sales: 220,
      likes: 110,
      imageUrl: productImg2,
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

export const comments: Comment[] = [
  {
    id: 1,
    userId: 'user01',
    content: 'This is a great post!',
    writtenTime: '10:00 AM',
    likes: 5,
    createdDate: '2024-05-05',
    updatedData: '2024-05-05',
    replies: [
      {
        id: 2,
        userId: 'user02',
        content: 'I totally agree with you!',
        writtenTime: '10:15 AM',
        likes: 3,
        createdDate: '2024-05-05',
        updatedData: '2024-05-05',
        replies: [],
      },
    ],
  },
  {
    id: 3,
    userId: 'user03',
    content: 'Thanks for sharing this!',
    writtenTime: '11:00 AM',
    likes: 2,
    createdDate: '2024-05-05',
    updatedData: '2024-05-05',
    replies: [],
  },
  {
    id: 4,
    userId: 'user04',
    content: 'Can someone explain this topic more?',
    writtenTime: '12:00 PM',
    likes: 1,
    createdDate: '2024-05-05',
    updatedData: '2024-05-05',
    replies: [
      {
        id: 5,
        userId: 'user05',
        content: 'Sure, what do you need help with?',
        writtenTime: '12:05 PM',
        likes: 1,
        createdDate: '2024-05-05',
        updatedData: '2024-05-05',
        replies: [],
      },
      {
        id: 6,
        userId: 'user06',
        content: 'I can help too!',
        writtenTime: '12:10 PM',
        likes: 0,
        createdDate: '2024-05-05',
        updatedData: '2024-05-05',
        replies: [],
      },
    ],
  },
  {
    id: 7,
    userId: 'user07',
    content: 'This needs more discussion.',
    writtenTime: '01:00 PM',
    likes: 4,
    createdDate: '2024-05-05',
    updatedData: '2024-05-05',
    replies: [],
  },
];
