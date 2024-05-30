import React from 'react';

import { routines } from '../../../types/MainDummyData';
import RoutineLists from './MainRoutines.styles';
import RoutineList from './RoutineList';
import chest from '../../../assets/img/routine/chest.png';
import apsan from '../../../assets/img/routine/Apsan.webp';
import frontdouble from '../../../assets/img/routine/frontdouble.jpg';

const MainRoutines: React.FC = () => {
  return (
    <RoutineLists>
      {/* {routines.map((routine) => (
        <RoutineList key={routine.id} routine={routine} />
      ))} */}
      <RoutineList routine={routines[0]} img={chest} />
      <RoutineList routine={routines[1]} img={apsan} />
      <RoutineList routine={routines[2]} img={frontdouble} />
    </RoutineLists>
  );
};

export default MainRoutines;
