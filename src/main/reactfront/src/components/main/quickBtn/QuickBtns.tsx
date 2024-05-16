import React from 'react';

import QuickBtn from './QuickBtn';

import Btns from '../../../styles/main/QuickBtns';

import LocalMallIcon from '@mui/icons-material/LocalMall'; // 상품몰
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'; // 운동정보
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // 루틴
import PeopleIcon from '@mui/icons-material/People';

const QuickBtns: React.FC = () => {
  return (
    <Btns>
      <QuickBtn btnName={'운동정보'}>
        <MedicalInformationIcon />
      </QuickBtn>
      <QuickBtn btnName={'핏온몰'}>
        <LocalMallIcon />
      </QuickBtn>
      <QuickBtn btnName={'커뮤니티'}>
        <PeopleIcon />
      </QuickBtn>
      <QuickBtn btnName={'루틴공유'}>
        <FitnessCenterIcon />
      </QuickBtn>
    </Btns>
  );
};

export default QuickBtns;
