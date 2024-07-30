import React from 'react';

import { Link } from 'react-router-dom';

import { CardWrapper, RoutineImgCard, TextBox } from './RoutineList.styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  partIdToNameMap,
  levelIdToNameMap,
  goalIdToNameMap,
} from '../../postDetail/PostDetail';

type RoutineData = {
  routineId: number;
  title: string;
  nickname: string;
  partId: number;
  levelId: number;
  goalId: number;
  likes: number;
};

interface RoutineListProps {
  routine: RoutineData;
  imageUrl: string;
}

const RoutineList: React.FC<RoutineListProps> = (props) => {
  const { routineId, title, nickname, partId, levelId, goalId, likes } =
    props.routine;

  return (
    <CardWrapper>
      <Link to={`routine/${routineId}`}>
        <RoutineImgCard>
          <img src={props.imageUrl} alt="루틴이미지" />
        </RoutineImgCard>
        <TextBox>
          <div>
            <h3>{title}</h3>
            <span>
              <FavoriteIcon fontSize="small" />
              {likes}
            </span>
          </div>
          <p>{nickname}</p>
          <p>{`운동목적 : ${goalIdToNameMap[goalId]} / 난이도 : ${levelIdToNameMap[levelId]} / 운동부위 : ${partIdToNameMap[partId]}`}</p>
        </TextBox>
      </Link>
    </CardWrapper>
  );
};

export default RoutineList;
