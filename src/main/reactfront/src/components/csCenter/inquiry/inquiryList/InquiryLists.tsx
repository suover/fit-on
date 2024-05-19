import React, { useState } from 'react';

import { Inquiry } from '../../../../types/MainDummyData';
import InquiryTable from './inquiryLists.styles';
import InquiryListItem from './InquiryListItem';

import { Pagination, Stack } from '@mui/material';

const InquiryLists: React.FC<{ inquiryData: Inquiry[] }> = ({
  inquiryData,
}) => {
  const [clickedInquiry, setClickedInquiry] = useState<number | null>(null);

  const expandList = (inquiryNum: number | null): void => {
    setClickedInquiry(inquiryNum);
  };

  return (
    <>
      <InquiryTable>
        <li>
          <div>
            <span>번호</span>
            <span>답변상태</span>
            <span>카테고리</span>
            <p>제목</p>
            <span>작성자</span>
            <span>작성일</span>
          </div>
        </li>
        {inquiryData.map((inquiry) => (
          <InquiryListItem
            key={inquiry.id}
            inquiryData={inquiry}
            clickedNum={clickedInquiry}
            onClickList={expandList}
          />
        ))}
      </InquiryTable>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination count={5} variant="outlined" />
      </Stack>
    </>
  );
};

export default InquiryLists;
