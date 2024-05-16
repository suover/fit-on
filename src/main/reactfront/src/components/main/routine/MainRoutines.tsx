import React from 'react';

import { routines } from '../../../DummyData';
import RoutineLists from './MainRoutines.styles';
import RoutineList from './RoutineList';
import routineImg1 from '../../../assets/routine1.jpg';
import routineImg2 from '../../../assets/routine2.jpg';
import routineImg3 from '../../../assets/routine3.jpg';

const MainRoutines: React.FC = () => {
  return (
    <RoutineLists>
      {/* {routines.map((routine) => (
        <RoutineList key={routine.id} routine={routine} />
      ))} */}
      <RoutineList routine={routines[0]} img={routineImg1} />
      <RoutineList routine={routines[1]} img={routineImg2} />
      <RoutineList routine={routines[2]} img={routineImg3} />
    </RoutineLists>
  );
};

export default MainRoutines;
