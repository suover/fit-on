import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoutineLists from './MainRoutines.styles';
import RoutineList from './RoutineList';
import axios from '../../../api/axiosConfig';

const MainRoutines: React.FC = () => {
  const [routines, setRoutines] = useState<any[]>([]);
  const limit = 3;

  useEffect(() => {
    const fetchTopRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/best', {
          params: { limit },
        });
        const transformedData = response.data.map((routine: any) => ({
          ...routine,
          id: routine.routineId,
          likes: routine.likes,
          views: routine.viewCount,
          imageUrl: routine.imageUrl,
        }));
        setRoutines(transformedData);
      } catch (error) {
        console.error('Failed to fetch top routines:', error);
      }
    };

    fetchTopRoutines();
  }, []);

  return (
    <RoutineLists>
      {routines.map((routine) => (
        <Link key={routine.id} to={`/routine/${routine.id}`}>
          <RoutineList routine={routine} />
        </Link>
      ))}
    </RoutineLists>
  );
};

export default MainRoutines;
