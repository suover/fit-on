import React, { useEffect, useState } from 'react';
import SwiperList from '../swiper/SwiperList';
import routine4 from '../../assets/img/routine/routine4.jpg';
import routine5 from '../../assets/img/routine/routine5.jpg';
import routine6 from '../../assets/img/routine/routine6.jpg';
import routine7 from '../../assets/img/routine/routine7.jpg';
import chest from '../../assets/img/routine/chest.png';
import apsan from '../../assets/img/routine/Apsan.webp';
import frontdouble from '../../assets/img/routine/frontdouble.jpg';

const dummyData = [
  {
    routineId: 1,
    title: '가슴 루틴 공유',
    userId: '가슴중독자',
    viewCount: 250,
    likes: 112,
    imageUrl: chest,
  },
  {
    routineId: 2,
    title: '대구 앞산 산행코스',
    userId: '대구 엄홍길',
    viewCount: 80,
    likes: 56,
    imageUrl: apsan,
  },
  {
    routineId: 3,
    title: '저의 팔 루틴을 공유합니다',
    userId: '달서구왕팔',
    viewCount: 50,
    likes: 22,
    imageUrl: frontdouble,
  },
  {
    routineId: 4,
    title: '나의 오분할 루틴',
    userId: 'Writer 3',
    viewCount: 25,
    likes: 10,
    imageUrl: routine4,
  },
  {
    routineId: 5,
    title: '운동 너무 어렵네요',
    userId: '헬린이',
    viewCount: 10,
    likes: 7,
    imageUrl: routine5,
  },
  {
    routineId: 6,
    title: '다이어트 꿀팁',
    userId: '아가리어터',
    viewCount: 8,
    likes: 2,
    imageUrl: routine6,
  },
  {
    routineId: 7,
    title: '서울 자전거 코스 있을까요??',
    userId: '대한의아들 엄복동',
    viewCount: 2,
    likes: 1,
    imageUrl: routine7,
  },

  // ... 나머지 더미 데이터들
];

const RoutineBestList = () => {
  const [routines, setRoutines] = useState<any[]>([]); // 상태의 타입을 명시

  useEffect(() => {
    const fetchTopRoutines = () => {
      try {
        const transformedData = dummyData.map((info) => ({
          ...info,
          id: info.routineId, // routineId를 id로 변환
          views: info.viewCount,
        }));
        setRoutines(transformedData);
      } catch (error) {
        console.error('Failed to fetch top routines:', error);
      }
    };

    fetchTopRoutines();
  }, []);

  return <SwiperList swiperData={routines} pageURL="routine" />;
};

export default RoutineBestList;
