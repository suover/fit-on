import React from 'react';
import { RoutineData } from '../../../types/MainDummyData';
import { CardWrapper, RoutineImgCard, TextBox } from './RoutineList.styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface RoutineListProps {
  routine: RoutineData;
}

const RoutineList: React.FC<RoutineListProps> = (props) => {
  const { title, userId, nickname, likes, views, imageUrl } = props.routine;

  return (
    <CardWrapper>
      <a href="/">
        <RoutineImgCard>
          <img src={imageUrl} alt="루틴이미지" />
        </RoutineImgCard>
        <TextBox>
          <div>
            <h3>{title}</h3>
            <span>
              <FavoriteIcon fontSize="small" />
              {likes}
            </span>
            <span>
              <VisibilityIcon fontSize="small" />
              {views}
            </span>
          </div>
          <p>{nickname}</p>
        </TextBox>
      </a>
    </CardWrapper>
  );
};

export default RoutineList;
