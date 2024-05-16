import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { InfoPosts } from '../../../DummyData';
import ContentCard from '../../contentCard/ContentCard';
import {
  StyledSwiperWrapper,
  StyledSwiper,
  PrevBtn,
  NextBtn,
} from './MainInfo.styles';

import { SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MainInfo: React.FC = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const swiperSetting = {
    spaceBetween: 50,
    slidesPerView: 4,
    slidesPerGroup: 1,
    modules: [Navigation],
    className: 'mySwiper',
    onBeforeInit: (swiper: SwiperCore) => {
      swiperRef.current = swiper;
    },
    navigation: {
      prevEl: prevBtnRef.current,
      nextEl: nextBtnRef.current,
    },
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiperRef, prevBtnRef, nextBtnRef]);

  return (
    <StyledSwiper>
      <StyledSwiperWrapper {...swiperSetting}>
        {InfoPosts.map((infoPost) => (
          <SwiperSlide key={infoPost.id}>
            <Link to={`/info/${infoPost.id}`}>
              <ContentCard content={infoPost} Icon={VisibilityOutlinedIcon} />
            </Link>
          </SwiperSlide>
        ))}
      </StyledSwiperWrapper>
      <PrevBtn ref={prevBtnRef} onClick={() => swiperRef.current?.slidePrev()}>
        <ArrowBackIosIcon />
      </PrevBtn>
      <NextBtn ref={nextBtnRef} onClick={() => swiperRef.current?.slideNext()}>
        <ArrowForwardIosIcon />
      </NextBtn>
    </StyledSwiper>
  );
};

export default MainInfo;

// const swiperSetting = {
//   spaceBetween: '40px',
//   slidesPerView: 4,
//   modules: [Navigation],
//   className: 'mySwiper',
//   navigation: {
//     prevEl: prevBtnRef.current,
//     nextEl: nextBtnRef.current,
//   },
//   onBeforeInit: (swiper: SwiperClass) => {
//     swiper.params.navigation.prevEl = prevBtnRef.current;
//     swiper.params.navigation.nextEl = nextBtnRef.current;
//     swiper.navigation.update();
//   },
// };
