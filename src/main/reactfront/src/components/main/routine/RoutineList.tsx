import React from 'react';

import { RoutineData } from '../../../models/data';

import { CardWrapper, RoutineImgCard, TextBox } from './RoutineList.styles';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface RoutineListProps {
  routine: RoutineData;
  img: string;
}

const RoutineList: React.FC<RoutineListProps> = (props) => {
  const { title, userId, exerciseType, likes } = props.routine;

  return (
    <CardWrapper>
      <a href="/">
        <RoutineImgCard>
          <img src={props.img} alt="루틴이미지" />
        </RoutineImgCard>
        <TextBox>
          <div>
            <h3>{title}</h3>
            <span>
              <FavoriteIcon fontSize="small" />
              {likes}
            </span>
          </div>
          <p>{userId}</p>
          <p>{exerciseType}</p>
        </TextBox>
      </a>
    </CardWrapper>
  );
};

export default RoutineList;
