import styled from 'styled-components';
import { Swiper } from 'swiper/react';

const StyledSwiper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSwiperWrapper = styled(Swiper)`
  width: 100%;
  height: auto;
  padding: 3px 10px 0;
  position: relative;
  top: 0;
  left: -10px;
`;

const CustomBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  z-index: 10;
  cursor: pointer;
  background: transparent;
  color: #555;

  svg {
    font-size: 2rem;
  }
`;

const PrevBtn = styled(CustomBtn)`
  left: -50px;
`;

const NextBtn = styled(CustomBtn)`
  right: -50px;
`;

export { StyledSwiper, StyledSwiperWrapper, PrevBtn, NextBtn };
