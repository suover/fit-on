import React, { useEffect, useRef, useState } from 'react';

import { Product } from '../../../types/MainDummyData';
import { products } from '../../../types/MainDummyData';
import Item from '../../productItem/ProductItem';
import { Items, PrevBtn, NextBtn } from './BestItems.styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BestItems: React.FC<{ selectedCategory: string }> = ({
  selectedCategory,
}) => {
  const [bestItems, setBestItems] = useState<Product[]>(
    products[selectedCategory],
  );
  const swiperRef = useRef<SwiperCore | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setBestItems(products[selectedCategory]);
  }, [selectedCategory]);

  return (
    <Items>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        slidesPerGroup={1}
        modules={[Navigation]}
        className="mySwiper"
        onBeforeInit={(swiper: SwiperCore) => (swiperRef.current = swiper)}
        key={selectedCategory}
      >
        {bestItems.map((item) => (
          <SwiperSlide key={item.id}>
            <Item product={item} $imgHeight={300} />
          </SwiperSlide>
        ))}
      </Swiper>
      <PrevBtn ref={prevBtnRef} onClick={() => swiperRef.current?.slidePrev()}>
        <ArrowBackIosIcon />
      </PrevBtn>
      <NextBtn ref={nextBtnRef} onClick={() => swiperRef.current?.slideNext()}>
        <ArrowForwardIosIcon />
      </NextBtn>
    </Items>
  );
};

export default BestItems;
