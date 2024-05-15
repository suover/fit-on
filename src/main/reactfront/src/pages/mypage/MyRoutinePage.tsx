import React from 'react';
import { Typography, Box } from '@mui/material';

function MyRoutinePage() {
  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        나의 루틴
      </Typography>
      <Typography>
        이 페이지에서는 사용자의 운동 루틴을 관리할 수 있습니다.
      </Typography>
    </Box>
  );
}

export default MyRoutinePage;
