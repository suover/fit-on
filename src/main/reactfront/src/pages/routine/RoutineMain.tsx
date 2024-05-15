import { Container, Paper, Box, Typography } from '@mui/material';
import RoutineBestList from '../../components/routine/RoutineBestList';
import ButtonNewRoutine from '../../components/common/button/ButtonNewRoutine';
import RoutineTotalList from '../../components/routine/RoutineTotalList';

const RoutineMain = () => {
  return (
    <Paper sx={{ mb: 4 }}>
      <Container>
        <Box sx={{ mt: 4, mb: 4, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h4" component="h2" sx={{ p: 3 }}>
            베스트 루틴
          </Typography>
          <RoutineBestList />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            mb: 4,
            mr: 2,
          }}
        >
          <ButtonNewRoutine />
        </Box>
        <Box>
          <RoutineTotalList />
        </Box>
      </Container>
    </Paper>
  );
};

export default RoutineMain;
