import React from 'react';

import { InfoPosts } from '../../types/MainDummyData';
import { InfoSection, ImgWrapper } from '../../styles/information/Info.styles';

import CardList from '../../components/cardList/CardList';
import { Container } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Info: React.FC = () => {
  return (
    <InfoSection>
      <Container>
        <ImgWrapper>
          <p>제목 뭐라고 하지? fitON!</p>
        </ImgWrapper>
        <CardList
          contents={InfoPosts}
          pageURL="info"
          Icon={VisibilityOutlinedIcon}
        />
      </Container>
    </InfoSection>
  );
};

export default Info;
