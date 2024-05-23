import React from 'react';

import { routines } from '../../types/DummyData';
import SwiperList from '../swiper/SwiperList';

const RoutineBestList = () => {
  return <SwiperList swiperData={routines} pageURL="routine" />;
};

export default RoutineBestList;
