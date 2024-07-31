import React, { useEffect, useState } from 'react';

import axios from '../../../api/axiosConfig';

import RoutineLists from './MainRoutines.styles';
import RoutineList from './RoutineList';

const MainRoutines: React.FC = () => {
  const [routineList, setRoutineList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfoData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/main/routine');
        setRoutineList(res.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfoData();
  }, []);

  return (
    <RoutineLists>
      {loading ? (
        <p className="text">Loading...</p>
      ) : (
        routineList.map((routine) => (
          <RoutineList
            key={routine.routineId}
            routine={routine}
            imageUrl={routine.imageUrl}
          />
        ))
      )}
    </RoutineLists>
  );
};

export default MainRoutines;
