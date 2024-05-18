import React from 'react';
import ContentDetail from '../../components/contentDetail/ContentDetail';

const dummyData = {
  id: 1,
  title: '봄맞이 세일 이벤트',
  content:
    '다가오는 봄을 맞이하여 모든 상품에 최대 30% 할인된 가격으로 만나보세요.',
  createDate: '2024-03-01',
  views: 1000,
  writer: 'FITON',
};

const EventDetail = () => {
  return <ContentDetail detailData={dummyData} />;
};

export default EventDetail;
