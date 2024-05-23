import React, { useState } from 'react';

import {
  MainBanner,
  TitleBox,
  BestItemHeader,
  Btns,
} from '../../styles/main/Main.styles';

import MainCommuity from '../../components/main/community/MainCommuity';
import MainInfo from '../../components/main/info/MainInfo';
import QuickBtns from '../../components/main/quickBtn/QuickBtns';
import MainRoutines from '../../components/main/routine/MainRoutines';
import TabBtn from '../../components/main/tabBtn/TabBtn';
import BestItems from '../../components/main/bestItems/BestItems';

import { Container } from '@mui/material';

const categories = ['운동용품', '보충제', '영양제'];

const Main: React.FC = () => {
  const [selectedCategory, setSelectedCategoty] = useState<string>(
    categories[0],
  );

  const handleSelect = (selectedBtn: string): void => {
    setSelectedCategoty(selectedBtn);
  };

  return (
    <section>
      <MainBanner />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '100px',
        }}
      >
        <p>
          FitOn's
          <br />
          Special TIP
        </p>
        <QuickBtns />
      </Container>
      <Container sx={{ marginBottom: '100px' }}>
        <TitleBox className="info">
          <h2>INFORMATION</h2>
          <p>더 효과적인 운동을 위한 유익한 정보를 읽어보세요!</p>
        </TitleBox>
        <MainInfo />
      </Container>
      <Container sx={{ marginBottom: '100px' }}>
        <BestItemHeader>
          <TitleBox>
            <h2>BEST ITEMS</h2>
            <p>핏온몰의 베스트 아이템을 만나보세요!</p>
          </TitleBox>
          <Btns>
            {categories.map((category, idx) => (
              <TabBtn
                key={idx}
                selected={selectedCategory}
                onSelect={handleSelect}
              >
                {category}
              </TabBtn>
            ))}
          </Btns>
        </BestItemHeader>
        <BestItems selectedCategory={selectedCategory} />
      </Container>
      <Container sx={{ marginBottom: '100px' }}>
        <TitleBox>
          <h2>COMMUNITY</h2>
          <p>운동과 관련된 다양한 이야기들을 공유해보세요!</p>
        </TitleBox>
        <MainCommuity />
      </Container>
      <Container sx={{ marginBottom: '100px' }}>
        <TitleBox>
          <h2>ROUTINES</h2>
          <p>나만의 운동루틴을 다양한 사람들과 공유해보세요!</p>
        </TitleBox>
        <MainRoutines />
      </Container>
    </section>
  );
};

export default Main;
