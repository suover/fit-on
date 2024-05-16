import React from 'react';

import { posts } from '../../../DummyData';

import ListTable from '../../ListTable/ListTable';

const colunmData = [
  { columnId: 'id', title: '번호', width: 30, marginRight: 50 },
  { columnId: 'title', title: '제목', width: 500, align: 'left' },
  { columnId: 'writer', title: '작성자', width: 80, marginRight: 50 },
  { columnId: 'likes', title: '좋아요', width: 80, marginRight: 50 },
  { columnId: 'views', title: '조회수', width: 80, marginRight: 50 },
  { columnId: 'createDate', title: '작성일', width: 80 },
];

const MainCommuity: React.FC = () => {
  return (
    <ListTable
      data={posts}
      columnData={colunmData}
      pageUrl="community"
      paging={false}
    />
  );
};

export default MainCommuity;
