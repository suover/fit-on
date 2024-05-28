import React, { useEffect, useState } from 'react';
import SwiperList from '../swiper/SwiperList';
import axios from 'axios';

const RoutineBestList = () => {
  const [routines, setRoutines] = useState([]);
  const limit = 10; // 가져올 루틴의 개수

  useEffect(() => {
    const fetchTopRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/best', {
          params: { limit },
        });
        const transformedData = response.data.map((info: any) => ({
          ...info,
          id: info.routineId, // routineId를 id로 변환
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
