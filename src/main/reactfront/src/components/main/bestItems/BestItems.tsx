import React, { useEffect, useRef, useState } from 'react';

import axios from '../../../api/axiosConfig';

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
  const [bestItems, setBestItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const swiperRef = useRef<SwiperCore | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchInfoData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/main/product', {
          params: { category: selectedCategory },
        });
        const productData = res.data;
        console.log(productData);
        setBestItems(productData);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfoData();
  }, [selectedCategory]);

  const loadingInfo = (
    <p className="text">{loading ? 'Loading...' : '등록된 상품이 없습니다.'}</p>
  );

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
        {bestItems.length > 0
          ? bestItems.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Item product={item} $imgHeight={250} />
              </SwiperSlide>
            ))
          : loadingInfo}
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
