import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ContentCard from '../../components/contentCard/ContentCard';
import {
  StyledSwiperWrapper,
  StyledSwiper,
  PrevBtn,
  NextBtn,
} from './SwiperList.styles';

import { SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type SwiperDataType = {
  id: number | string;
  title: string;
  imageUrl: string;
  likes: number;
};

interface SwiperListProps<T> {
  swiperData: T[];
  pageURL: string;
}

const SwiperList = <T extends SwiperDataType>({
  swiperData,
  pageURL,
}: SwiperListProps<T>) => {
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
        {swiperData.map((data) => (
          <SwiperSlide key={data.id}>
            <Link to={`/${pageURL}/${data.id}`}>
              <ContentCard content={data} Icon={VisibilityOutlinedIcon} />
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

export default SwiperList;
