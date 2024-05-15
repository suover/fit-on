import React from 'react';

import { Container, Paper } from '@mui/material';
import ViewRoutine from '../../components/routine/ViewRoutine';

const ViewRoutineDetail = () => {
  return (
    <Paper>
      <Container maxWidth="lg">
        <ViewRoutine />
      </Container>
    </Paper>
  );
};

export default ViewRoutineDetail;
