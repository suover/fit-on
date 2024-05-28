import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';

const RoutineTotalList = () => {
  const [routineList, setRoutineList] = useState<any[]>([]);

  useEffect(() => {
    // 백엔드에서 데이터 가져오기
    axios
      .get('http://localhost:8080/api/routine') // 적절한 API 엔드포인트로 수정하세요
      .then((response) => {
        setRoutineList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching routines:', error);
      });
  }, []);

  return (
    <CardLists contents={routineList} pageURL="routine" Icon={ShareIcon} />
  );
};

export default RoutineTotalList;
