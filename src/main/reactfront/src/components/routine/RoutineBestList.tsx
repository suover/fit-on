import React, { useEffect, useState } from 'react';
import SwiperList from '../swiper/SwiperList';
import axios from '../../api/axiosConfig';

const RoutineBestList: React.FC = () => {
  const [routines, setRoutines] = useState<any[]>([]);
  const limit = 10; // 가져올 루틴의 개수

  useEffect(() => {
    const fetchTopRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/best', {
          params: { limit },
        });
        const transformedData = response.data.map((routine: any) => ({
          ...routine,
          id: routine.routineId,
          views: routine.viewCount,
          likes: routine.likes,
        }));
        setRoutines(transformedData);
      } catch (error) {}
    };

    fetchTopRoutines();
  }, []);

  return <SwiperList swiperData={routines} pageURL="routine" />;
};

export default RoutineBestList;
