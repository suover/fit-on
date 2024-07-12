import React, { useEffect, useState } from 'react';
import SwiperList from '../swiper/SwiperList';
import axios from 'axios';

const RoutineBestList: React.FC = () => {
  const [routines, setRoutines] = useState<any[]>([]);
  const limit = 10; // 가져올 루틴의 개수

  useEffect(() => {
    const fetchTopRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/best', {
          params: { limit },
        });
        const transformedData = response.data.map((info: any) => ({
          ...info,
          id: info.routineId,
          views: info.viewCount,
          likes: info.likes, // 좋아요 수 포함
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
