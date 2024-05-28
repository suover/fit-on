import React, { useEffect, useState } from 'react';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';

const RoutineTotalList = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get('/api/routine');
        const transformedData = response.data.map((info: any) => ({
          ...info,
          id: info.routineId, // routineId를 id로 변환
          views: info.viewCount,
        }));
        setRoutines(transformedData);
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  return <CardLists contents={routines} pageURL="routine" Icon={ShareIcon} />;
};

export default RoutineTotalList;
