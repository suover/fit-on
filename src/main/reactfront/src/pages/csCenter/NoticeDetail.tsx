import React from 'react';
import ContentDetail from '../../components/contentDetail/ContentDetail';

const dummyData = {
  id: 1,
  title: '2024년 신년 이벤트 공지',
  content:
    '2024년을 맞아 새해 이벤트를 개최합니다. 이벤트에 참여하고 다양한 경품을 받아보세요.',
  createDate: '2024-01-01',
  views: 1000,
  writer: 'FITON',
};

const NoticeDetail = () => {
  return <ContentDetail detailData={dummyData} />;
};

export default NoticeDetail;
