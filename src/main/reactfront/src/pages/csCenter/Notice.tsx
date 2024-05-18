import React from 'react';

import ListTable from '../../components/ListTable/ListTable';
import { notices } from '../../types/MainDummyData';
import { Heading } from '../../styles/csCenter/ClientServie.styles';

const colunmData = [
  { columnId: 'id', title: '번호', width: 40, marginRight: 50 },
  { columnId: 'title', title: '제목', width: 700, align: 'left' },
  { columnId: 'writer', title: '작성자', width: 80, marginRight: 50 },
  { columnId: 'createDate', title: '작성일', width: 100, marginRight: 50 },
  { columnId: 'views', title: '조회수', width: 80 },
];

const Notice = () => {
  return (
    <>
      <Heading>공지사항</Heading>
      <ListTable
        data={notices}
        columnData={colunmData}
        pageUrl="notice"
        paging={true}
      />
    </>
  );
};

export default Notice;
