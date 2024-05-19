import { Box } from '@mui/material';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';

import { routines } from '../../types/DummyData';

const RoutineTotalList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CardLists contents={routines} pageURL="routine" Icon={ShareIcon} />
    </Box>
  );
};

export default RoutineTotalList;
