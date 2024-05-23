import React from 'react';

import { InfoPosts } from '../../../types/MainDummyData';
import SwiperList from '../../swiper/SwiperList';

const MainInfo: React.FC = () => {
  return <SwiperList swiperData={InfoPosts} pageURL="info" />;
};

export default MainInfo;
