import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';

import { routines } from '../../types/DummyData';

const RoutineTotalList = () => {
  return <CardLists contents={routines} pageURL="routine" Icon={ShareIcon} />;
};

export default RoutineTotalList;
