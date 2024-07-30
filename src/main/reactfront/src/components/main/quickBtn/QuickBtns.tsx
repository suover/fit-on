import React from 'react';

import QuickBtn from './QuickBtn';

import Btns from './QuickBtns.styles';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Link } from 'react-router-dom';

const QuickBtns: React.FC = () => {
  return (
    <Btns>
      <Link to="/info/search">
        <QuickBtn btnName={'운동정보'}>
          <MedicalInformationIcon />
        </QuickBtn>
      </Link>
      <Link to="/mall">
        <QuickBtn btnName={'핏온몰'}>
          <LocalMallIcon />
        </QuickBtn>
      </Link>
      <Link to="/community">
        <QuickBtn btnName={'커뮤니티'}>
          <PeopleIcon />
        </QuickBtn>
      </Link>
      <Link to="/routine">
        <QuickBtn btnName={'루틴공유'}>
          <FitnessCenterIcon />
        </QuickBtn>
      </Link>
      <Link to="/service">
        <QuickBtn btnName={'고객센터'}>
          <SupportAgentIcon />
        </QuickBtn>
      </Link>
    </Btns>
  );
};

export default QuickBtns;
