import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import ContentCard from '../contentCard/ContentCard';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import { Routine } from '../../types/DummyData';

type RoutineCardProps = {
  routine: Routine;
};

const RoutineCard: React.FC<RoutineCardProps> = ({ routine }) => {
  const navigate = useNavigate();

  const handleRowClick = (routine: Routine) => {
    navigate(`/routine/${routine.id}`, { state: { routine } });
  };

  return (
    <Box onClick={() => handleRowClick(routine)}>
      <ContentCard content={routine} Icon={ShareIcon} />
    </Box>
  );
};
export default RoutineCard;
