import React from 'react';

import { events } from '../../types/MainDummyData';
import ListTable from '../../components/listTable/ListTable';
import { Heading } from '../../styles/csCenter/ClientServie.styles';

const colunmData = [
  { columnId: 'id', title: '번호', width: 40, marginRight: 50 },
  { columnId: 'title', title: '제목', width: 700, align: 'left' },
  { columnId: 'writer', title: '작성자', width: 80, marginRight: 50 },
  { columnId: 'createDate', title: '작성일', width: 100, marginRight: 50 },
  { columnId: 'views', title: '조회수', width: 80 },
];

const Event = () => {
  return (
    <>
      <Heading>이벤트</Heading>
      <ListTable
        data={events}
        columnData={colunmData}
        pageUrl="service/event"
        paging={true}
      />
    </>
  );
};

export default Event;
