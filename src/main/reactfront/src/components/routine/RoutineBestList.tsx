import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';

import RoutineCard from './RoutineCard';

import { Routine ,routines} from '../../types/DummyData';

const RoutineBestList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Slider {...settings}>
        {routines.map((routine) => (
          <Box
            key={routine.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', 
              p: 1, 
            }}
          >
            <RoutineCard routine={routine} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default RoutineBestList;



