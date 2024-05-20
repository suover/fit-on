import { Box, Typography } from '@mui/material';
import React from 'react';
import RoutineBestList from '../../components/routine/RoutineBestList';
import RoutineTotalList from '../../components/routine/RoutineTotalList';

const MyRoutinesPage = () => {
  return (
    <>
      <Typography variant="h4" component="h2" sx={{ p: 3 }}>
        나의 루틴
      </Typography>
      <RoutineBestList />
      <Box
        sx={{
          display: 'flex',
          mt: 2,
          mb: 4,
          mr: 2,
        }}
      ></Box>
      <RoutineTotalList />
    </>
  );
};

export default MyRoutinesPage;
