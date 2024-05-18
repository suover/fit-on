import React, { useState } from 'react';

import { FaqData } from '../../../types/MainDummyData';
import FAQListItem from './FAQListItem';
import StyledFAQList from './FAQLists.styles';

import { Pagination, Stack } from '@mui/material';

const FAQLists: React.FC<{ faqs: FaqData[] }> = ({ faqs }) => {
  const [clickedFaqNum, setClickedFaqNum] = useState<number | null>(null);

  const expandList = (faqNum: number | null): void => {
    setClickedFaqNum(faqNum);
  };

  return (
    <>
      <StyledFAQList>
        {faqs.map((faq) => (
          <FAQListItem
            key={faq.faqNum}
            faq={faq}
            clicked={clickedFaqNum}
            onClickList={expandList}
          />
        ))}
      </StyledFAQList>
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

export default FAQLists;
