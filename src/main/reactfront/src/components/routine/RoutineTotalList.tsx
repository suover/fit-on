import React, { useEffect, useState } from 'react';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { Pagination, Box } from '@mui/material';
import myroutine from '../../assets/img/routine/myroutine.jpg';
import routine1 from '../../assets/img/routine/routine1.jpg';
import routine2 from '../../assets/img/routine/routine2.jpg';
import routine3 from '../../assets/img/routine/routine3.jpg';
import routine4 from '../../assets/img/routine/routine4.jpg';
import routine5 from '../../assets/img/routine/routine5.jpg';
import routine6 from '../../assets/img/routine/routine6.jpg';
import routine7 from '../../assets/img/routine/routine7.jpg';
import routine8 from '../../assets/img/routine/routine8.jpg';
import routine9 from '../../assets/img/routine/routine9.jpg';
import routine10 from '../../assets/img/routine/routine10.jpg';
import routine11 from '../../assets/img/routine/routine11.jpg';
import chest from '../../assets/img/routine/chest.png';
import apsan from '../../assets/img/routine/Apsan.webp';
import frontdouble from '../../assets/img/routine/frontdouble.jpg';

interface RoutineTotalListProps {
  searchQuery: string;
}

interface ContentsType {
  id: number | string;
  title: string;
  nickname: string;
  views: number;
  likes: number;
  imageUrl: string;
  routineParts: string[];
}

const RoutineTotalList: React.FC<RoutineTotalListProps> = ({ searchQuery }) => {
  const [routines, setRoutines] = useState<ContentsType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const dummyData: ContentsType[] = [
          {
            id: 1,
            title: '저의 헬스 루틴입니다.',
            nickname: 'zl존승민',
            views: 0,
            likes: 0,
            imageUrl: myroutine,
            routineParts: ['웨이트'],
          },
          {
            id: 2,
            title: '팔 루틴',
            nickname: '동탄왕팔',
            views: 2,
            likes: 5,
            imageUrl: routine1,
            routineParts: ['웨이트'],
          },
          {
            id: 3,
            title: '대구 앞산 산행코스',
            nickname: '대구 엄홍길',
            views: 23,
            likes: 56,
            imageUrl: apsan,
            routineParts: ['등산'],
          },
          {
            id: 4,
            title: '가슴 루틴 공유',
            nickname: '가슴중독자',
            views: 36,
            likes: 112,
            imageUrl: chest,
            routineParts: ['웨이트'],
          },
          {
            id: 5,
            title: '운동 너무 어렵네요,,',
            nickname: '헬린이',
            views: 20,
            likes: 7,
            imageUrl: routine4,
            routineParts: ['웨이트'],
          },
          {
            id: 6,
            title: '다이어트 꿀팁',
            nickname: '아가리어터',
            views: 12,
            likes: 2,
            imageUrl: routine5,
            routineParts: ['다이어트'],
          },
          {
            id: 7,
            title: '서울 자전거 코스 추천 있을까요??',
            nickname: '대한의아들 엄복동',
            views: 0,
            likes: 1,
            imageUrl: routine6,
            routineParts: ['자전거'],
          },
          {
            id: 8,
            title: '나의 5분할 루틴',
            nickname: '경기도 씨범',
            views: 0,
            likes: 10,
            imageUrl: routine7,
            routineParts: ['웨이트'],
          },
          {
            id: 9,
            title: '어꺠 루틴',
            nickname: '코코넛어꺠',
            views: 0,
            likes: 7,
            imageUrl: routine8,
            routineParts: ['웨이트'],
          },
          {
            id: 10,
            title: '저의 모닝 루틴을 소개합니다,,',
            nickname: '요가강사',
            views: 0,
            likes: 22,
            imageUrl: routine9,
            routineParts: ['체력 개선'],
          },
          {
            id: 11,
            title: '초보자 하체 루틴',
            nickname: '하체 하기싫어 ',
            views: 0,
            likes: 0,
            imageUrl: routine10,
            routineParts: ['웨이트'],
          },
          {
            id: 12,
            title: '저의 팔 루틴을 공유합니다.',
            nickname: '달서구왕팔',
            views: 0,
            likes: 22,
            imageUrl: frontdouble,
            routineParts: ['웨이트'],
          },
        ];
        setRoutines(dummyData);
        setTotalPages(1);
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      }
    };

    fetchRoutines();
  }, [page, searchQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Box>
      <CardLists contents={routines} pageURL="routine" Icon={ShareIcon} />
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RoutineTotalList;
