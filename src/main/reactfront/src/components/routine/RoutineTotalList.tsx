
import { Box } from '@mui/material';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';

import { Routine ,routines} from '../../types/DummyData';

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
      <CardLists contents={routines} pageURL="routines" Icon={ShareIcon} />
    </Box>
  );
};

export default RoutineTotalList;